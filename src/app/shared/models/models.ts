export class Subcategory {
  id: string;
  parentCategory: string;
  name: string;
  description: string;
  img: string;
  highlightMsg: string;
}
export class Category {
  id: string;
  name: string;
  subCategories: Subcategory[];
}