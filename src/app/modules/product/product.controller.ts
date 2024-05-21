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
    const allProducts = await productServices.retrieveAllProductsFromDB();

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

export const productControllers = {
  addProduct,
  retrieveAllProducts,
  retrieveAProductById,
};
