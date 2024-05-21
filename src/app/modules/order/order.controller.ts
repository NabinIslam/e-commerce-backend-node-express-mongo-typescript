import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';

import { orderServices } from './order.service';
import { Order } from './order.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const zodParsedData = orderValidationSchema.parse(order);

    const alreadyExists = await Order.findOne(zodParsedData);

    if (alreadyExists) throw new Error(`Order already exists`);

    const result = await orderServices.createOrderInDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
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
