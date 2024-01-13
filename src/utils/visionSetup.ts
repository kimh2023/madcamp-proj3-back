const vision = require("@google-cloud/vision");
export const productSearchClient = new vision.ProductSearchClient();
export const imageAnnotatorClient = new vision.ImageAnnotatorClient();

export const projectId = "august-oarlock-410522";
export const location = "asia-east1";
export const productSetId = "laptops";
export const productCategory = "homegoods-v2";
export const filter = "";
