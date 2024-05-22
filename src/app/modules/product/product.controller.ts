/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { productServices } from './product.service';
import { Product } from './product.model';

const addProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const zodParsedData = productValidationSchema.parse(product);

    const existingProduct = await Product.findOne({ name: zodParsedData.name });

    if (existingProduct) throw new Error(`This product already exists`);

    const result = await productServices.addProductToDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: `Could not create the product`,
      error: error.message,
    });
  }
};

const retrieveAllProducts = async (req: Request, res: Response) => {
  try {
    const search = req.query.searchTerm || '';

    const searchRegExp = new RegExp('.*' + search + '.*', 'i');

    const filter = {
      $or: [{ name: { $regex: searchRegExp } }],
    };

    const allProducts = await productServices.retrieveAllProductsFromDB(filter);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: allProducts,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: `Could not retrieve the products`,
      error: error.message,
    });
  }
};

const retrieveAProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await productServices.retrieveAProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: `Could not retrieve the product`,
      error: error.message,
    });
  }
};

const updateAProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProductData = req.body;
    const option = { new: true };

    const updatedProduct = await productServices.updateAProductFromDB(
      productId,
      updatedProductData,
      option,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: `Could not update the product`,
      error: error.message,
    });
  }
};

const deleteAProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.deleteAProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: `Could not delete the product`,
      error: error.message,
    });
  }
};

export const productControllers = {
  addProduct,
  retrieveAllProducts,
  retrieveAProductById,
  updateAProductById,
  deleteAProductById,
};
