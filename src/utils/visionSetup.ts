const vision = require("@google-cloud/vision");
export const productSearchClient = new vision.ProductSearchClient();
export const imageAnnotatorClient = new vision.ImageAnnotatorClient();

export const projectId = "august-oarlock-410522";
export const location = "asia-east1"; // only this allowed in asia....
export const productSetId = "laptops"; // this is from Product Set name: projects/august-oarlock-410522/locations/asia-east1/productSets/laptops
export const productCategory = "homegoods-v2";
export const filter = "";
