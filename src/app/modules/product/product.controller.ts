import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { productServices } from './product.service';

const addProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const zodParsedData = productValidationSchema.parse(product);

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

export const productControllers = {
  addProduct,
};
