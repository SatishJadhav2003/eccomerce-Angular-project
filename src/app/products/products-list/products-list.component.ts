import { Component } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  products: Product[];
  constructor() {
    this.products = this.product.sort(
      (a, b) => b.rating - a.rating
    );
    console.log(this.product);
  }
  product: Product[] = [
    {
      id: '1',
      name: 'Bat',
      title: 'Cricket bat with high',
      description: 'This is the all-time favorite bat of Virat Kohli',
      price: 1999,
      actual_price: 4999,
      highlights: [
        'its very usefull for men',
        'its good ',
        'very good product',
      ],
      images: '../../../assets/images/products/sports/gloves.webp',
      category_id: '1',
      brand: 'Apple',
      availability: 17,
      offer: '70% off',
      rating: 4.5,
      reviews: [
        { rating: 4.5, comment: 'One of the best products ever' },
        { rating: 4, comment: 'One of the best products ever' },
        { rating: 5, comment: 'One of the best products ever' },
      ],
      specifications: [
        {
          name: 'Height',
          value: '12.2 inch',
        },
        {
          name: 'Height',
          value: '12.2 inch',
        },
        {
          name: 'Height',
          value: '12.2 inch',
        },
        {
          name: 'Height',
          value: '12.2 inch',
        },
        {
          name: 'Height',
          value: '12.2 inch',
        },
      ],
      variants: [
        {
          id: '12',
          title: 'Best bat ever',
          price: 12222,
          availability: 3,
        },
      ],
      keywords: ['bat'],
      additionalInfo: null,
    },
    // Add more objects here if needed
    {
      id: '2',
      name: 'Football',
      title: 'Official Match Football',
      description: 'High-quality football for professional matches',
      price: 999,
      actual_price: 2999,
      highlights: [
        'its very usefull for men',
        'its good ',
        'very good product',
      ],
      images: '../../../assets/images/products/sports/volleyball.jpeg',
      category_id: '1',
      brand: 'Nike',
      availability: 3,
      offer: '50% off',
      rating: 4.8,
      reviews: [{ rating: 4.8, comment: 'Great ball for competitive play' }],
      specifications: [
        {
          name: 'Size',
          value: '5',
        },
      ],
      variants: [],
      keywords: ['dsd'],
      additionalInfo: null,
    },
    {
      id: '3',
      name: 'Basketball',
      title: 'Indoor/Outdoor Basketball',
      description: 'Versatile basketball for both indoor and outdoor use',
      price: 799,
      actual_price: 1499,
      highlights: [
        'its very usefull for men',
        'its good ',
        'very good product',
      ],
      images: '../../../assets/images/products/sports/volleyball.jpeg',
      category_id: '1',
      brand: 'Adidas',
      availability: 144,
      offer: '30% off',
      rating: 4.2,
      reviews: [{ rating: 4.2, comment: 'Durable ball with great grip' }],
      specifications: [
        {
          name: 'Material',
          value: 'Synthetic Leather',
        },
      ],
      variants: [],
      keywords: ['dsd'],
      additionalInfo: null,
    },
    {
      id: '4',
      name: 'Tennis Racket',
      title: 'Professional Tennis Racket',
      description: 'Designed for high-performance tennis players',
      price: 2499,
      actual_price: 4999,
      highlights: [
        'its very usefull for men',
        'its good ',
        'very good product',
      ],
      images: '../../../assets/images/products/sports/bat.webp',
      category_id: '1',
      brand: 'Wilson',
      availability: 9,
      offer: '20% off',
      rating: 1,
      reviews: [{ rating: 4.7, comment: 'Excellent control and power' }],
      specifications: [
        {
          name: 'Head Size',
          value: '100 sq in',
        },
      ],
      variants: [],
      keywords: ['dsd'],
      additionalInfo: null,
    },
    {
      id: '5',
      name: 'Golf Club Set',
      title: 'Complete Golf Club Set',
      description: 'Includes all necessary clubs for a round of golf',
      price: 2999,
      actual_price: 6599,
      highlights: [
        'its very usefull for men',
        'its good ',
        'very good product',
      ],
      images: '../../../assets/images/products/sports/golfclubset.webp',
      category_id: '1',
      brand: 'Titleist',
      availability: 23,
      offer: '15% off',
      rating: 2.4,
      reviews: [{ rating: 4.6, comment: 'High-quality clubs with great feel' }],
      specifications: [
        {
          name: 'Number of Clubs',
          value: '14',
        },
      ],
      variants: [],
      keywords: ['dsd'],
      additionalInfo: null,
    },
  ];

  product_info(data) {
    console.log(data);
  }
}
