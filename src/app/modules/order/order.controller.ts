/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { orderServices } from './order.service';
import { Order } from './order.model';
import { Product } from '../product/product.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const zodParsedData = orderValidationSchema.parse(order);

    const alreadyExists = await Order.findOne(zodParsedData);

    if (alreadyExists) throw new Error(`Order already exists`);

    //finding the ordered product by id
    const orderedProduct = await Product.findOne({
      _id: zodParsedData.productId,
    });

    if (orderedProduct !== null) {
      //checking inventory availability
      if (orderedProduct.inventory.quantity < zodParsedData.quantity)
        throw new Error(`Insufficient quantity available in inventory`);

      const result = await orderServices.createOrderInDB(zodParsedData);

      if (!result) throw new Error(`Order not found`);

      if (result) {
        //updating the ordered product's quantity after order has been created
        const updatedQuantityProduct = await Product.findByIdAndUpdate(
          orderedProduct?._id,
          {
            'inventory.quantity':
              orderedProduct.inventory.quantity - zodParsedData.quantity,
          },
          { new: true },
        );

        if (updatedQuantityProduct !== null) {
          //after order has been created if the quantity becomes zero, updating the stock status to false
          if (updatedQuantityProduct.inventory.quantity === 0)
            await Product.findByIdAndUpdate(
              orderedProduct?._id,
              {
                'inventory.inStock': false,
              },
              { new: true },
            );
        }
      }

      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: `Could not create the order`,
      error: error.message,
    });
  }
};

const retrieveAllOrders = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    const orders = await orderServices.retrieveAllOrdersFromDB(query);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: `Could not retrieve the orders`,
      error: error.message,
    });
  }
};

export const orderControllers = {
  createOrder,
  retrieveAllOrders,
};
