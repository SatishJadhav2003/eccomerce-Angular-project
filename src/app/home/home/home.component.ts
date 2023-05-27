import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isBanner:Boolean=true;
  constructor() {}
  ngOnInit() {

  }
 // get sample products
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
