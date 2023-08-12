export class Subcategory {
  _id: string;
  name: string;
  description: string;
  image: string;
  highlightMsg: string;
  types: [
    {
      name: string;
    }
  ];
}
export class Category {
  _id: string;
  name: string;
  image: string;
  subCategories: Subcategory[];
}

export class CartProducts {
  product_id: string;
  quantity: number;
  title: string;
  price: number;
  MRP: number;
  image: string;
}

export class Order {
  _id: string;
  user_id: string;
  status: string;
  order_date: Date;
  delivery_date: Date;
  payment_mode: string;
  products:orderProducts[];
  shipping_add: {
    name: string;
    mobile: number;
    address: string;
    city: string;
    state: string;
    postal_code: number;
    shipping_at: string;
  };
}

export class orderProducts{
  product_id:string;
  quantity:number;
  price:number;
}
