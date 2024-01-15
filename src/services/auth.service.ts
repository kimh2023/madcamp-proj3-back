import * as crypto from "crypto";
import * as fs from "fs";
import { google } from "googleapis";
import * as jwt from "jsonwebtoken";
import { type SentMessageInfo } from "nodemailer";
import * as nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import * as path from "path";
import { type User } from "src/entities/user.entity";
import { UserRepository } from "src/repositories";
import { type AuthResponseDto } from "src/types/auth.types";

import { createUser, returnPartialUser } from "./user.service";

const privateKeyPath: string = path.join(__dirname, "../certs/private.key");
const privateKey = fs.readFileSync(privateKeyPath);

const signup = async (newUser: Partial<User>): Promise<AuthResponseDto> => {
  if (newUser.email === undefined) {
    return { success: false, message: "Wrong request format." };
  }
  const verificationToken = returnEmailToken();
  const response = await createUser({
    ...newUser,
    verificationToken,
  });
  await sendVerificationEmail(newUser.email, verificationToken);
  return response;
};

const verify = async (token: string): Promise<AuthResponseDto> => {
  const user = await UserRepository.findOne({
    where: { verificationToken: token, isVerified: false },
  });
  const updateResult = await UserRepository.update(
    { verificationToken: token, isVerified: false },
    { isVerified: true, verificationToken: undefined },
  );
  if (user === null) {
    return { success: false, message: "Wrong verification token." };
  }
  return {
    success: true,
    message: "Successful signup",
    user: returnPartialUser(user),
    token: createJWT(user),
  };
};

const login = async (
  email: string,
  password: string,
): Promise<AuthResponseDto> => {
  const user = await UserRepository.findOne({
    where: { email },
  });
  if (user === null) {
    return { success: false, message: "No such user." };
  }
  if (!user.isVerified) {
    return { success: false, message: "User email not verified." };
  }
  const salt = user.salt;
  const hashedPassword = hashPassword(password, salt);
  if (hashedPassword !== user.password) {
    return { success: false, message: "Wrong password." };
  }
  return {
    success: true,
    message: "Successful login",
    user: returnPartialUser(user),
    token: createJWT(user),
  };
};

const refresh = async (_id: number): Promise<AuthResponseDto> => {
  const user = await UserRepository.findOne({
    where: { _id, isVerified: true },
  });
  if (user === null) {
    return { success: false, message: "No such user." };
  }
  return {
    success: true,
    message: "Successful refresh",
    user: returnPartialUser(user),
    token: createJWT(user),
  };
};

const authService = {
  signup,
  verify,
  login,
  refresh,
};

export default authService;

/// /////////////

export const createSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const hashPassword = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString();
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, iat: Math.floor(Date.now() / 1000) },
    privateKey,
    {
      algorithm: "RS256",
      expiresIn: "3h",
    },
  );
  return token;
};

export const returnEmailToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

const sendVerificationEmail = async (
  email: string,
  verificationToken: string,
) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.MAIL_CLIENT_ID,
    process.env.MAIL_CLIENT_SECRET,
    process.env.MAIL_REDIRECT_URI, // Set this to one of the redirect URIs you specified
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.MAIL_REFRESH_TOKEN,
  });

  const { token } = await oAuth2Client.getAccessToken();

  if (token === null) {
    return;
  }

  const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
    nodemailer.createTransport({
      port: 25,
      service: "gmail",
      secure: false,
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USER,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
        accessToken: token,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Verify Your Email",
      text: `TO COMPLETE YOUR REGISTRATION,
VERIFY YOUR EMAIL ADDRESS BY CLICKING ON THE LINK BELOW:
${process.env.BACKEND_URL}/auth/verify?token=${verificationToken}`,
      html: `<html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification</title>
        <style>
          .background {
            font-family: "Helvetica Neue", sans-serif;
            line-height: 1;
            color: #333;
            height: 400px;
            width: 80%;
            max-width: 1700px;
    
            background-image: url("https://storage.googleapis.com/madcamp/.image/email.png");
            background-size: cover; /* Adjust the background size as needed */
            background-position: center; /* Adjust the background position as needed */
            background-repeat: no-repeat; /* Prevent background image from repeating */
    
            padding: 20px 100px 50px 70px;
            display: flex;
            flex-direction: column;
          }
          a.button {
            padding: 15px 100px;
            background-color: #000;
            color: #fff;
            text-decoration: none;
            font-size: 20px;
            border-radius: 50px;
            transition: background-color 0.8s ease;
            font-weight: bold;
            /* width: 50px; */
            margin-top: auto;
            margin-left: auto;
          }
          a.button:hover {
            background-color: #e18dff;
          }
    
          /* Add additional styles as needed */
        </style>
      </head>
      <body>
        <div class="background">
          <div style="width: 100%">
            <p
              style="
                font-size: 48px;
                color: #000;
                word-spacing: 10px;
                font-weight: bold;
              "
            >
              VERIFY YOUR EMAIL
            </p>
            <p
              style="
                font-size: 24px;
                color: #e18dff;
                word-spacing: 5px;
                font-weight: bold;
              "
            >
              TO COMPLETE YOUR REGISTRATION,<br />
              VERIFY YOUR EMAIL ADDRESS
            </p>
          </div>
          <a
            href="${process.env.BACKEND_URL}/auth/verify?token=${verificationToken}"
            class="button"
            target="_blank"
            >VERIFY</a
          >
        </div>
      </body>
    </html>
    
    `,
    },
    (err: Error | null, info: SentMessageInfo) => {
      if (err !== null) {
        console.log(err);
      } else {
        console.log("Email sent to", info.accepted);
      }
    },
  );
};
