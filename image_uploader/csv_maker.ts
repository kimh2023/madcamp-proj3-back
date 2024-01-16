import path from "path";
import { Storage } from "@google-cloud/storage";

const fs = require("fs");
const readline = require("readline");
const csvWriter = require("csv-write-stream");

const csvFilePath = path.join(
  __dirname,
  "image_links/search_results_check.csv",
);

const csvWriteStream = csvWriter({ sendHeaders: false });
csvWriteStream.pipe(fs.createWriteStream(csvFilePath, { flags: "w" }));

for (let id: number = 0; id < 664; id++) {
  const csvLine = {
    "image-uri": `gs://madcamp/.productImages/${id}.jpg`,
    "image-id": `${id}`,
    "product-set-id": "laptop",
    "product-id": `${id}`,
    "product-category": "homegoods-v2",
    "product-display-name": `${id}`,
    labels: "",
    "bounding-poly": "",
  };
  csvWriteStream.write(csvLine);
}
