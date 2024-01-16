import path from "path";

import { Product } from "./entities/product.entity";
import productService from "./services/product.service";
import { downloadImageRetry, uploadImageRetry } from "./utils/uploadImages";

const csvWriter = require("csv-write-stream");
const fs = require("fs");
const readline = require("readline");

const jsonlReadPath = path.join(
  __dirname,
  "../image_uploader/image_links/search_results_output.jsonl",
);
const csvFilePath = path.join(
  __dirname,
  "../image_uploader/image_links/search_results_check.csv",
);

export const populateProducts = async () => {
  const jsonlData = fs.readFileSync(jsonlReadPath, "utf-8").split("\n");
  const nonEmptyJsonlData =
    jsonlData.length > 0 && jsonlData[jsonlData.length - 1] === ""
      ? jsonlData.slice(0, -1)
      : jsonlData;

  const csvWriteStream = csvWriter({ sendHeaders: false });
  csvWriteStream.pipe(fs.createWriteStream(csvFilePath, { flags: "w" }));
  interface LineDto {
    title: string;
    url: string;
    rating: string;
    price: string;
    image: string;
    search_url: string;
  }

  try {
    const dataObjects = nonEmptyJsonlData.map((line: string) =>
      JSON.parse(line),
    );

    await Promise.all(
      dataObjects.map(async (line: LineDto, index: number) => {
        const prefixUrl = line.url.split("url=%2F");
        const postfixUrl = decodeURIComponent(prefixUrl[prefixUrl.length - 1]);
        const cleanUrl = postfixUrl.startsWith("/")
          ? postfixUrl.substring(1)
          : postfixUrl;
        const actualUrl = cleanUrl.split("/ref=")[0];

        const newProduct = new Product();
        newProduct.image = line.image;
        newProduct.link = "https://www.amazon.com/" + actualUrl;
        newProduct.name = line.title;
        newProduct.price =
          (line.price && parseFloat(line.price.replace("$", ""))) || 0;
        newProduct.rating =
          (line.rating && parseFloat(line.rating.substring(0, 3))) || 0;
        newProduct._id = index + 1;
        productService
          .createProduct(newProduct)
          .then(
            async (productResponse) =>
              await downloadImageRetry(
                productResponse,
                productResponse.product.image,
                0,
              ),
          )
          .then(async (downloadResponse) => {
            if (downloadResponse !== undefined) {
              return await uploadImageRetry(
                String(downloadResponse.productResponse.product._id),
                downloadResponse.image,
                0,
              );
            }
          })
          .then((imageUri) => {
            if (imageUri !== undefined) {
              const csvLine = {
                "image-uri": imageUri,
                "image-id": newProduct._id,
                "product-set-id": "laptops",
                "product-id": newProduct._id,
                "product-category": "homegoods-v2",
                "product-display-name": newProduct._id,
                labels: "",
                "bounding-poly": "",
              };
              csvWriteStream.write(csvLine);
            }
          })
          .catch((error) => {
            console.error("Population error: ", error);
          });
      }),
    );
  } catch (error) {
    console.error("Population error: ", error);
  }
};
