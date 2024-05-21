import { TOrder } from './order.interface';
import { Order } from './order.model';

const craeteOrderInDB = async (orderData: TOrder) =>
  await Order.create(orderData);

export const orderServices = {
  craeteOrderInDB,
};
