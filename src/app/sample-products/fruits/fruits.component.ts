import { Component } from '@angular/core';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent {
  products: any = [
    {
      id: '2',
      title: 'Mango',
      highlight: 'From ₹89 only',
      price: 89,
      img: '../../../assets/images/products/mango.png',
    },
    {
      id: '2',
      title: 'Milk',
      highlight: 'Shop now',
      price: 700,
      img: '../../../assets/images/products/milk.png',
    },
    {
      id: '2',
      title: 'Banana',
      highlight: 'Min 50% off',
      price: 700,
      img: '../../../assets/images/products/banana.png',
    },
    {
      id: '2',
      title: 'apple',
      highlight: 'Shop now',
      price: 700,
      img: '../../../assets/images/products/apple.png',
    },
    {
      id: '2',
      title: 'Grapes',
      highlight: 'Min 60% off ',
      price: 700,
      img: '../../../assets/images/products/grapes.png',
    },
  ];

}
