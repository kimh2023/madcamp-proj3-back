import { type NextFunction, type Request, type Response } from "express";

import { AppDataSource } from "./AppDataSource";
import { UserRepository } from "./repositories";

const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const path = require("path");
const authRouter = require("src/routes/auth.route");
const searchRouter = require("src/routes/search.route");
const usersRouter = require("src/routes/user.route");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["src/routes/*.ts"],
};
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const specs = swaggerJsdoc(options);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/search", searchRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));

AppDataSource.initialize()
  .then(async () => {
    if (process.env.SYNCHRONIZE === "true") {
      await UserRepository.clear();
      // initPlanData()
      //   .then(() => {
      //     console.log('Data Source has been MIGRATED!');
      //   })
      //   .catch(err => {
      //     console.error('Data Source migrations had the error: ', err);
      //   });
      console.log("Data Source has been CLEARED!");
    } else {
      console.log("Data Source has been INITIALIZED!");
    }
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(cors());

module.exports = app;
