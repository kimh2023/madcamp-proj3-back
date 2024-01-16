import { type Product } from "src/entities/product.entity";
import { ProductRepository } from "src/repositories";

const createProduct = async (newProduct: Partial<Product>) => {
  const product: Product = ProductRepository.create(newProduct);
  await ProductRepository.save(product);
  return {
    success: true,
    message: "Successful product creation",
    product,
  };
};

const getProduct = async (_id: number) => {
  const product = await ProductRepository.findOne({
    where: { _id },
  });

  if (product === null) {
    return { success: false, message: "No such product." };
  }
  return {
    success: true,
    message: "Product retrieved",
    product,
  };
};

const productService = { createProduct, getProduct };

export default productService;
