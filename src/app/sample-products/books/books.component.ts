import { Component } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
 // get sample products
  products: any = [
    {
      id: '2',
      title: 'Bhagavad gita',
      highlight: 'Religion',
      price: 199,
      img: '../../../assets/images/products/books/Bhagavadgita.jpg',
    },
    {
      id: '2',
      title: 'Rich dad poor dad',
      highlight: '20% off',
      price: 149,
      img: '../../../assets/images/products/books/richdadpoordad.webp',
    },
    {
      id: '2',
      title: 'ikigai',
      highlight: 'Lowest price of all time',
      price: 129,
      img: '../../../assets/images/products/books/ikigai.jpg',
    },
    {
      id: '2',
      title: 'think and grow rich',
      highlight: 'Flat 30% off',
      price: 179,
      img: '../../../assets/images/products/books/thinkandgrowwrich.jpg',
    },
    {
      id: '2',
      title: 'the monk who sold his farari',
      highlight: 'Min 60% off ',
      price: 199,
      img: '../../../assets/images/products/books/themonkwhosoldhisfarari.png',
    },
  ];
}
