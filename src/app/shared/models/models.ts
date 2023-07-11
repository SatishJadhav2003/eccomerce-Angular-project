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
  product_id: string;
  quantity: number;
  title: string;
  price: number;
  MRP:number;
  image: string;
}
