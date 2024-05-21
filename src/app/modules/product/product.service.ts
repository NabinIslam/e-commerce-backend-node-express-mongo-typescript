import { TProduct } from './product.interface';
import { Product } from './product.model';

const addProductToDB = async (productData: TProduct) =>
  await Product.create(productData);

const retrieveAllProductsFromDB = async () => await Product.find();

export const productServices = {
  addProductToDB,
  retrieveAllProductsFromDB,
};
