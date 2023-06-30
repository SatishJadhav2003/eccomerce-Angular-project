
export class Product {
  id: string;
  name: string;
  title:string;
  description: string;
  price: number;
  actual_price:number;
  discount?:any;
  images: string; // Assuming an array of image URLs
  category_id:string ;
  brand: string;
  availability: number;
  offer:string;
  rating: number;
  reviews: Review[];
  specifications: Specification[];
  variants: Variant[];
  highlights:string[];
  keywords:string[];
  additionalInfo: any; // Placeholder for additional custom fields
  sellUnit:number;

  constructor() {
    this.reviews = [];
    this.specifications = [];
    this.variants = [];
    this.additionalInfo = {};
  }
}

export class Review {
  rating: number;
  comment: string;

  constructor(rating: number, comment: string) {
    this.rating = rating;
    this.comment = comment;
  }
}

export class Specification {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

export class Variant {
  id: string;
  title: string;
  price: number;
  availability: number;

  constructor(id: string, title: string, price: number, availability: number) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.availability = availability;
  }
}
