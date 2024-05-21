import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Please fill a valid email address' }),
  productId: z.string({ required_error: 'Product id is required' }),
  price: z.number({ required_error: 'Product price is required' }),
  quantity: z
    .number({ required_error: 'Product quantity is required' })
    .min(1, { message: 'Quantity must be at least 1' }),
});

export default orderValidationSchema;
