import { type Product } from "src/entities/product.entity";
import { ProductRepository } from "src/repositories";

const createProduct = async (newProduct: Partial<Product>) => {
  const product: Product = ProductRepository.create(newProduct);
  await ProductRepository.save(product);
};

const productService = { createProduct };

export default productService;
