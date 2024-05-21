import { TProduct } from './product.interface';
import { Product } from './product.model';

const addProductToDB = async (productData: TProduct) =>
  await Product.create(productData);

const retrieveAllProductsFromDB = async () => await Product.find();

const retrieveAProductFromDB = async (id: string) =>
  await Product.findOne({ _id: id });

export const productServices = {
  addProductToDB,
  retrieveAllProductsFromDB,
  retrieveAProductFromDB,
};
