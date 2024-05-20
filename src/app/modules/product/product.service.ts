import { TProduct } from './product.interface';
import { Product } from './product.model';

const addProductToDB = async (productData: TProduct) =>
  await Product.create(productData);

export const productServices = {
  addProductToDB,
};
