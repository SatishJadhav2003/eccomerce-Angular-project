export interface OrderHistory {
  id: string;
  product: {
    id: string;
    title: string;
    img: string;
    price: number;
  };
  qty: number;
  status: string;
  payment_mode: string;
  ordered_date: Date;
  delivery_date: Date;
  shippingAdd: {
    name: string;
    mobile: number;
    address: string;
    city: string;
    state: string;
    postal_code: number;
    shipping: string;
  };
}
