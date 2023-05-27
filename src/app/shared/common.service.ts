import { EventEmitter, Injectable } from '@angular/core';
import { Category } from './models/models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  mobile: boolean = false;
  currentCate: Category[];
  currCateChanged = new Subject<Category>();
  temp: Category;

  constructor() { }

  // Getting category
  getCategory() {
    return [...this.categories];
  }

  // Getting categories by id
  getCategoriesByIndex(index: number): Category {
    this.temp = this.categories[index]
    this.currCateChanged.next(this.temp);
    return this.temp;
  }



  categories: Category[] = [
    {
      id: '1',
      name: 'Sports',
      subCategories: [
        {
          id: '1',
          parentCategory: '1',
          name: 'Cricket',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/sports/cricketset.webp',
          highlightMsg: 'Shop now',
        },
        {
          id: '2',
          parentCategory: '1',
          name: 'badmentan',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/sports/badmentan.jpeg',
          highlightMsg: 'Shop now',
        },
        {
          id: '3',
          parentCategory: '1',
          name: 'volleyball',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/sports/volleyball.jpeg',
          highlightMsg: 'Shop now',
        },
        {
          id: '41',
          parentCategory: '4',
          name: 'mango',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/mango.png',
          highlightMsg: 'Shop now',
        },
        {
          id: '1',
          parentCategory: '1',
          name: 'Cricket',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/sports/cricketset.webp',
          highlightMsg: 'Shop now',
        },
        {
          id: '2',
          parentCategory: '1',
          name: 'badmentan',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/sports/badmentan.jpeg',
          highlightMsg: 'Shop now',
        },
        {
          id: '3',
          parentCategory: '1',
          name: 'volleyball',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/sports/volleyball.jpeg',
          highlightMsg: 'Shop now',
        },
        {
          id: '41',
          parentCategory: '4',
          name: 'mango',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/mango.png',
          highlightMsg: 'Shop now',
        },
      ],
    },
    {
      id: '2',
      name: 'Fashion',
      subCategories: [
        {
          id: '3',
          parentCategory: '1',
          name: 'Cricket',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/sports/badmentan.jpeg',
          highlightMsg: 'Shop now',
        },
      ],
    },
    {
      id: '3',
      name: 'Sports',
      subCategories: [
        {
          id: '3',
          parentCategory: '1',
          name: 'Cricket',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/sports/cricketset.webp',
          highlightMsg: 'Shop now',
        },
      ],
    },
    {
      id: '4',
      name: 'Fruits',
      subCategories: [
        {
          id: '41',
          parentCategory: '4',
          name: 'mango',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/mango.png',
          highlightMsg: 'Shop now',
        },
        {
          id: '41',
          parentCategory: '4',
          name: 'mango',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/mango.png',
          highlightMsg: 'Shop now',
        },
      ],
    },
    {
      id: '5',
      name: 'Fashion',
      subCategories: [
        {
          id: '3',
          parentCategory: '1',
          name: 'Books',
          description: 'this is an fov of all time',
          img: '../../../assets/images/products/books/Bhagavadgita.jpg',
          highlightMsg: 'Shop now',
        },
      ],
    },
  ];

}
