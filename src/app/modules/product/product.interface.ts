import { Model } from 'mongoose';

export type TVariant = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
};

export type ProductMethod = {
  isStudentExists(): Promise<TProduct | null>;
};

export type ProductModel = Model<
  TProduct,
  Record<string, never>,
  ProductMethod
>;
