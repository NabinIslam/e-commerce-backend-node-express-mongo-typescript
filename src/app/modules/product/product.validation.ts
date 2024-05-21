import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, { message: 'Inventory quantity cannot be 0' }),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Product name must be at least 3 characters long' }),
  description: z.string().min(10, {
    message: 'Product description must be at least 10 characters long',
  }),
  price: z
    .number()
    .min(0, { message: 'Product price must be a positive number' }),
  category: z
    .string()
    .min(3, { message: 'Product category must be at least 3 characters long' }),
  tags: z
    .array(z.string())
    .min(1, { message: 'There must be at least one tag' }),
  variants: z
    .array(variantValidationSchema)
    .min(1, { message: 'There must be at least one variant' }),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
