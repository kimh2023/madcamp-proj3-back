import {
  type SearchResponseDto,
  type ProductResponseDto,
  type LocalizedObjectAnnotationDto,
} from "src/types/search.types";
import {
  filter,
  imageAnnotatorClient,
  location,
  productCategory,
  productSearchClient,
  productSetId,
  projectId,
} from "src/utils/visionSetup";

import productService from "./product.service";

const sharp = require("sharp");

const search = async (
  userId: number,
  file: Express.Multer.File,
): Promise<SearchResponseDto> => {
  try {
    const imageBuffer = file.buffer;

    const { width, height }: { width: number; height: number } =
      await sharp(imageBuffer).metadata();

    const localizationRequest = {
      image: { content: imageBuffer.toString("base64") },
    };

    const [result] =
      await imageAnnotatorClient.objectLocalization(localizationRequest);
    const objects = result.localizedObjectAnnotations;

    const promises = objects.map(async (object: any) => {
      const oneResult: LocalizedObjectAnnotationDto = {
        name: object.name,
        score: object.score,
        vertices: object.boundingPoly.normalizedVertices.map(
          (v: { x: number; y: number }) => ({ x: v.x, y: v.y }),
        ),
      };

      const vertices = object.boundingPoly.normalizedVertices;
      const x1 = Math.floor(vertices[0].x * width);
      const y1 = Math.floor(vertices[0].y * height);
      const x2 = Math.floor(vertices[2].x * width);
      const y2 = Math.floor(vertices[2].y * height);

      try {
        const croppedBuffer = await sharp(imageBuffer)
          .extract({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 })
          .toBuffer();

        const base64Image: string = croppedBuffer.toString("base64");
        const products = await searchProducts(userId, base64Image);

        oneResult.products = products;
        return oneResult;
      } catch (err) {
        console.error("Error processing image:", err);
      }
    });

    const completeResults: SearchResponseDto = {
      success: true,
      localizedObjectAnnotations: await Promise.all(promises),
    };

    return completeResults;
  } catch (error) {
    return { success: false };
  }
};

const searchProducts = async (userId: number, base64: string) => {
  const productSetPath = productSearchClient.productSetPath(
    projectId,
    location,
    productSetId,
  );

  const searchRequest = {
    image: { content: base64 },
    features: [{ type: "PRODUCT_SEARCH" }],
    imageContext: {
      productSearchParams: {
        productSet: productSetPath,
        productCategories: [productCategory],
        filter,
      },
    },
  };

  const [response] = await imageAnnotatorClient.batchAnnotateImages({
    requests: [searchRequest],
  });
  const results = response.responses[0].productSearchResults.results;

  if (!results || !Array.isArray(results)) {
    console.error("Invalid results array");
    return [];
  }

  const parsedResults = await Promise.all(
    results.map(async (result: ProductResponseDto) => {
      const productResponse = await productService.getProduct(
        Number(result.product.displayName),
      );
      console.log(
        typeof Number(result.product.displayName),
        Number(result.product.displayName),
        productResponse,
      );
      if (productResponse.product === undefined) {
        return null;
      }
      const didIPin = productResponse.product.pins.some(
        (pin) => pin.board.user._id === userId,
      );
      return {
        id: productResponse.product._id,
        name: productResponse.product.name,
        score: result.score,
        image: productResponse.product.image,
        link: productResponse.product.link,
        price: productResponse.product.price,
        rating: productResponse.product.rating,
        pinned: didIPin,
      };
    }),
  );

  return parsedResults;
};

const searchService = {
  search,
};

export default searchService;
