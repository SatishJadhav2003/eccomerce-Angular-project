import { Component } from '@angular/core';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})
export class ElectronicsComponent {

constructor(){}
 // get sample products
  products: any = [
    {
      id: '2',
      title: 'iPhone 14 plus',
      highlight: 'Shop now',
      price: 67999,
      img: '../../../assets/images/products/electronics/mobile/iphone14pro.webp',
    },
    {
      id: '2',
      title: 'moto e-13',
      highlight: '20% off',
      price: 7499,
      img: '../../../assets/images/products/electronics/mobile/motoe13.webp',
    },
    {
      id: '2',
      title: 'Macbook air m1',
      highlight: 'Lowest price of all time',
      price: 69999.78,
      img: '../../../assets/images/products/electronics/laptop/macbookairm1.webp',
    },
    {
      id: '2',
      title: 'boat rockerz 510',
      highlight: 'Flat 30% off',
      price: 1399,
      img: '../../../assets/images/products/electronics/other/boatrockerz510.webp',
    },
    {
      id: '2',
      title: 'infinix y1 LED TV',
      highlight: 'Min 60% off ',
      price: 8199,
      img: '../../../assets/images/products/electronics/other/infinixy1.webp',
    },
  ];

}
