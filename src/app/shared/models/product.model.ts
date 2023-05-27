import { Category } from "./models";

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // Assuming an array of image URLs
  category: Category;
  brand: string;
  availability: boolean;
  rating: number;
  reviews: Review[];
  specifications: Specification[];
  variants: Variant[];
  additionalInfo: any; // Placeholder for additional custom fields

  constructor() {
    this.images = [];
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
  name: string;
  price: number;
  availability: boolean;

  constructor(id: string, name: string, price: number, availability: boolean) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.availability = availability;
  }
}
