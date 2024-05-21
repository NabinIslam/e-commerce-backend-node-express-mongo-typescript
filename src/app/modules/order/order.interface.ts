export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export type TOrderedVariant = {
  type: string;
  value: string;
};

export type TOrderedInventory = {
  quantity: number;
  inStock: boolean;
};

export type TOrderedProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TOrderedVariant[];
  inventory: TOrderedInventory;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
