import { TProduct } from './product.interface';
import { Product } from './product.model';

const addProductToDB = async (productData: TProduct) =>
  await Product.create(productData);

const retrieveAllProductsFromDB = async (filter = {}) =>
  await Product.find(filter);

const retrieveAProductFromDB = async (id: string) =>
  await Product.findOne({ _id: id });

const updateAProductFromDB = async (
  id: string,
  updatedProductData: TProduct,
  option: { new: boolean },
) => await Product.findByIdAndUpdate({ _id: id }, updatedProductData, option);

const deleteAProductFromDB = async (id: string) =>
  await Product.findOneAndDelete({ _id: id });

export const productServices = {
  addProductToDB,
  retrieveAllProductsFromDB,
  retrieveAProductFromDB,
  updateAProductFromDB,
  deleteAProductFromDB,
};
