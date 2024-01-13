import path from "path";
import { Storage } from "@google-cloud/storage";

const fs = require("fs");
const readline = require("readline");
const csvWriter = require("csv-write-stream");

const jsonlFilePath = path.join(
  __dirname,
  "image_links/search_results_check.jsonl"
);
const csvFilePath = path.join(
  __dirname,
  "image_links/search_results_check.csv"
);
const uniqueField = "file_link"; // Replace 'fieldName' with the actual field you want to check for uniqueness

const csvWriteStream = csvWriter({ sendHeaders: false });
csvWriteStream.pipe(fs.createWriteStream(csvFilePath, { flags: "w" }));

const uniqueValuesSet = new Set();

const jsonlReadStream = readline.createInterface({
  input: fs.createReadStream(jsonlFilePath),
});

jsonlReadStream.on("line", (line: any) => {
  try {
    const jsonData = JSON.parse(line);

    if (jsonData.success) {
      console.log;
      if (!uniqueValuesSet.has(jsonData[uniqueField])) {
        uniqueValuesSet.add(jsonData[uniqueField]);

        let id = jsonData.title;
        if (id.length > 120) {
          id = id.substring(0, 120);
        }

        const csvLine = {
          "image-uri": jsonData.file_link,
          "image-id": id,
          "product-set-id": "laptops",
          "product-id": id,
          "product-category": "homegoods-v2",
          "product-display-name": id,
          labels: jsonData.search_url,
          "bounding-poly": "",
        };
        csvWriteStream.write(csvLine);
      }
    }
  } catch (error: any) {
    console.error(`Error processing line: ${line}`, error.message);
  }
});

jsonlReadStream.on("close", () => {
  csvWriteStream.end();
  console.log("Conversion from JSONL to CSV complete.");
});

const serviceKey = path.join(
  __dirname,
  "certs/august-oarlock-410522-794896e86aff.json"
);

// const storage = new Storage({
//   keyFilename: serviceKey,
//   projectId: "august-oarlock-410522",
// });
// const bucket = storage.bucket("madcamp");

// const uploadFile = async (fileName: string, file: Buffer) => {
//   return new Promise((resolve, reject) => {
//     let uploadFileName = fileName.replace("/", "");
//     if (uploadFileName.length >= 128) {
//       uploadFileName = uploadFileName.substring(0, 120); // product id limit length
//     }
//     // const blob = bucket.file(fileName + ".jpg");
//     const blob = bucket.file(uploadFileName + ".jpg");
//     // const blob = bucket.file(fileName.replace(/ /g, "%20") + ".jpg");
//     const blobStream = blob.createWriteStream({
//       resumable: false,
//       timeout: 500000,
//     });
//     let publicUrl;
//     blobStream
//       // .on("finish", () => {
//       //   publicUrl = format(`gs://madcamp/${blob.name}`);
//       //   resolve(publicUrl);
//       // })
//       .on("error", (err) => {
//         reject(new Error(`Unable to upload image. Error: ${err.toString()}`));
//       });

//     blobStream.end(file);
//   });
// };
