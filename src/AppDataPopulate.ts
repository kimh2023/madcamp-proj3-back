import path from "path";

import { Product } from "./entities/product.entity";

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

interface LineDto {
  title: string;
  url: string;
  rating: string;
  price: string;
  image: string;
  search_url: string;
}

export const populateProducts = async () => {
  jsonlStream.on("line", async (line: LineDto) => {
    const newProduct = new Product();
    // newProduct.image =
  });
};
