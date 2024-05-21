import { TProduct } from './product.interface';
import { Product } from './product.model';

const addProductToDB = async (productData: TProduct) =>
  await Product.create(productData);

const retrieveAllProductsFromDB = async (filter = {}) =>
  await Product.find(filter);

const retrieveAProductFromDB = async (id: string) =>
  await Product.findOne({ _id: id });

const deleteAProductFromDB = async (id: string) =>
  await Product.findOneAndDelete({ _id: id });

export const productServices = {
  addProductToDB,
  retrieveAllProductsFromDB,
  retrieveAProductFromDB,
  deleteAProductFromDB,
};
