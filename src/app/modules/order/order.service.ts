import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderInDB = async (orderData: TOrder) =>
  await Order.create(orderData);

const retrieveAllOrdersFromDB = async (filter = {}) => await Order.find(filter);

export const orderServices = {
  createOrderInDB,
  retrieveAllOrdersFromDB,
};
