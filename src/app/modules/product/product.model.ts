import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

const variantSchema = new Schema<TVariant>({
  type: { type: String, required: [true, 'Variant type is required'] },
  value: { type: String, required: [true, 'Variant value is required'] },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'Inventory quantity is required'],
    min: [0, 'Inventory quantity cannot be less than 0'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Inventory inStock status is required'],
  },
});

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [3, 'Product name must be at least 3 characters long'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [
        10,
        'Product description must be at least 10 characters long',
      ],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Product price must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      minlength: [3, 'Product category must be at least 3 characters long'],
    },
    tags: {
      type: [String],
      required: [true, 'Product tags are required'],
      validate: {
        validator: function (v: string[]) {
          return v.length > 0;
        },
        message: 'There must be at least one tag',
      },
    },
    variants: {
      type: [variantSchema],
      required: [true, 'Product variants are required'],
      validate: {
        validator: function (v: string[]) {
          return v.length > 0;
        },
        message: 'There must be at least one variant',
      },
    },
    inventory: {
      type: inventorySchema,
      required: [true, 'Product inventory is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', productSchema);
