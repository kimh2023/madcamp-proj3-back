import { Storage } from "@google-cloud/storage";
import axios from "axios";
import path from "path";
import { format } from "util";

const serviceKey = path.join(
  __dirname,
  "../../image_uploader/certs/august-oarlock-410522-794896e86aff.json",
);

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "august-oarlock-410522",
});
const bucket = storage.bucket("madcamp");

const uploadImage = async (
  fileName: string,
  file: Buffer,
): Promise<string | undefined> => {
  const blob = bucket.file(".productImages/" + fileName + ".jpg");
  const blobStream = blob.createWriteStream({
    resumable: false,
    timeout: 500000,
  });
  return await new Promise((resolve, reject) => {
    blobStream
      .on("finish", () => {
        const publicUrl = format(`gs://madcamp/${blob.name}`);
        resolve(publicUrl);
      })
      .on("error", (err) => {
        reject(new Error(`Unable to upload image. Error: ${err.toString()}`));
      });

    blobStream.end(file);
  });
};

export const uploadImageRetry = async (
  fileName: string,
  file: Buffer,
  tries: number,
): Promise<string | undefined> => {
  try {
    return await uploadImage(fileName, file);
  } catch (error: any) {
    console.error(error);
    if (error.message.includes("exceeded the rate limit") && tries < 10) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await uploadImageRetry(fileName, file, tries + 1);
    } else {
      return undefined;
    }
  }
};

interface DownloadResponseDto {
  image: Buffer;
  productResponse: any;
}

const downloadImage = async (
  productResponse: any,
  url: string,
): Promise<DownloadResponseDto | undefined> => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return { image: response.data, productResponse };
};

export const downloadImageRetry = async (
  productResponse: any,
  url: string,
  tries: number,
): Promise<DownloadResponseDto | undefined> => {
  try {
    return await downloadImage(productResponse, url);
  } catch (error: any) {
    console.error(`Error downloading image from URL: ${error.message}`);
    if (error.message.includes("exceeded the rate limit" && tries < 10)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await downloadImageRetry(productResponse, url, tries + 1);
    } else {
      return undefined;
    }
  }
};
