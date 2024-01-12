// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");

// Creates a client
const client = new vision.ProductSearchClient();

async function listProductSets() {
  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  const projectId = "august-oarlock-410522";
  const location = "asia-east1"; // only this allowed in asia....

  // Resource path that represents Google Cloud Platform location.
  const locationPath = client.locationPath(projectId, location);

  const [productSets] = await client.listProductSets({ parent: locationPath });
  productSets.forEach((productSet: any) => {
    console.log(`Product Set name: ${productSet.name}`);
    console.log(`Product Set display name: ${productSet.displayName}`);
  });
}
listProductSets();
