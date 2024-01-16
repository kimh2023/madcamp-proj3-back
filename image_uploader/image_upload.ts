import { Storage } from "@google-cloud/storage";
import { Response } from "express";
import path from "path";
import { format } from "util";

const axios = require("axios");

const fs = require("fs");
const readline = require("readline");

const jsonlFilePath = path.join(
  __dirname,
  "image_links/search_results_output.jsonl",
);
const jsonlWritePath = path.join(
  __dirname,
  "image_links/search_results_check.jsonl",
);

const jsonlStream = readline.createInterface({
  input: fs.createReadStream(jsonlFilePath),
});
const jsonlWriteStream = fs.createWriteStream(jsonlWritePath, { flags: "w" });

let index = 0;
jsonlStream.on("line", async (line: any) => {
  try {
    const jsonData = JSON.parse(line);
    console.log(`Downloading image from ${jsonData.image}`);
    try {
      const fileName = index;
      const imageData = await downloadImage(jsonData.image);
      console.log("Image downloaded successfully:", imageData);
      const fileLink = await uploadImage(String(fileName), imageData);
      jsonlWriteStream.write(
        JSON.stringify({
          index: index,
          ...jsonData,
          file_link: fileLink,
          success: true,
        }) + "\n",
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      index++;
    } catch (downloadError: any) {
      console.error(`Error downloading image from URL: ${jsonData.image}`);
      console.error(downloadError.message);
      jsonlWriteStream.write(
        JSON.stringify({ ...jsonData, success: false }) + "\n",
      );
    }
  } catch (jsonParseError: any) {
    console.error(`Error parsing JSON from line: ${line}`);
    console.error(jsonParseError.message);
  }
});

// Event listener for the end of the file
jsonlStream.on("close", () => {
  // jsonlWriteStream.end();
  console.log("Finished reading JSONL file.");
});

// Event listener for errors
jsonlStream.on("error", (error: Error) => {
  console.error(`Error reading JSONL file: ${error}`);
});

const downloadImage = async (url: string) => {
  return axios
    .get(url, { responseType: "arraybuffer" })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw new Error(`Error downloading image from URL: ${error.message}`);
    });
};

const serviceKey = path.join(
  __dirname,
  "certs/august-oarlock-410522-794896e86aff.json",
);

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "august-oarlock-410522",
});
const bucket = storage.bucket("madcamp");

const uploadImage = async (fileName: string, file: Buffer) => {
  return new Promise((resolve, reject) => {
    let uploadFileName = fileName.replace("/", "");
    if (uploadFileName.length >= 128) {
      uploadFileName = uploadFileName.substring(0, 120); // product id limit length
    }
    // const blob = bucket.file(fileName + ".jpg");
    const blob = bucket.file(".productImages/" + uploadFileName + ".jpg");
    // const blob = bucket.file(fileName.replace(/ /g, "%20") + ".jpg");
    const blobStream = blob.createWriteStream({
      resumable: false,
      timeout: 500000,
    });
    let publicUrl;
    blobStream
      .on("finish", () => {
        publicUrl = format(`gs://madcamp/${blob.name}`);
        resolve(publicUrl);
      })
      .on("error", (err) => {
        reject(new Error(`Unable to upload image. Error: ${err.toString()}`));
      });

    blobStream.end(file);
  });
};
