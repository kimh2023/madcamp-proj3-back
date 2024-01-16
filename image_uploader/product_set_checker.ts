// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");

// Creates a client
const client = new vision.ProductSearchClient();

const listProductSets = () => {
  return new Promise(async (resolve, reject) => {
    const projectId = "august-oarlock-410522";
    const location = "asia-east1"; // only this allowed in asia....
    const productSetId = "laptops";
    const locationPath = client.locationPath(projectId, location);

    const [productSets] = await client.listProductSets({
      parent: locationPath,
    });
    productSets.forEach((productSet: any) => {
      console.log(`Product Set name: ${productSet.name}`);
      console.log(`Product Set display name: ${JSON.stringify(productSet)}`);
    });

    const productSetPath = client.productSetPath(
      projectId,
      location,
      productSetId,
    );
    const formattedParent = client.locationPath(projectId, location);
    const purgeConfig = { productSetId: productSetId };

    // const res = await client.getProductSet({ name: productSetPath });
    // console.log("gotten", res);

    try {
      const [deleteResponse] = await client.deleteProductSet({
        name: productSetPath,
      });

      const [operation] = await client.purgeProducts({
        parent: formattedParent,
        productSetPurgeConfig: purgeConfig,
        force: true,
      });
      const [response] = await operation.promise();

      const [operationOrphan] = await client.purgeProducts({
        parent: formattedParent,
        deleteOrphanProducts: true,
        force: true,
      });
      await operationOrphan.promise();

      console.log("Delete Response:", deleteResponse, response);

      resolve("Successfully deleted product set");
    } catch (error) {
      console.error("Error during delete operation:", error);
      reject(error);
    }
  });
};
listProductSets()
  .then((successMessage) => {
    console.log(successMessage);
  })
  .catch((error) => {
    console.error("Something went wrong:", error);
  });
