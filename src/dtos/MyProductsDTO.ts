export type ImagesType = {
  path: string;
  id: string;
};

export type PaymentType = {
  key: string;
  name: string;
};

export type MyProductsDTO = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: boolean;
  product_images: ImagesType[];
  payment_methods: PaymentType[];
};
