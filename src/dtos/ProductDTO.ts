export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
};

type ProductImage = {
  path: string;
  id: string;
};

type PaymentMethod = {
  key: string;
  name: string;
};

type ProductUser = {
  avatar?: string;
};

export type AllProductDTO = {
  id: string;
  name: string;
  description?: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id?: string;
  product_images: ProductImage[];
  payment_methods: PaymentMethod[];
  user: ProductUser;
  is_active?: boolean;
};
