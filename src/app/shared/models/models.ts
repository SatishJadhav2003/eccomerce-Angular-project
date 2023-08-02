export class Subcategory {
  id: string;
  parentCategory: string;
  name: string;
  description: string;
  img: string;
  highlightMsg: string;
  types: [
    {
      name: string;
    }
  ];
}
export class Category {
  id: string;
  name: string;
  image: string;
  subCategories: Subcategory[];
}

export class CartProducts {
  id: string;
  product_id: string;
  quantity: number;
  title: string;
  price: number;
  MRP: number;
  image: string;
}

export class Order {
  id: string;
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
