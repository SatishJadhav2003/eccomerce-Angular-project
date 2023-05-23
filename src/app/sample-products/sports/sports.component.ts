import { Component } from '@angular/core';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent {

 // get sample products
  products: any = [
    {
      id: '2',
      title: 'Ckriket set',
      highlight: 'Trending',
      price: 8999,
      img: '../../../assets/images/products/sports/cricketset.webp',
    },
    {
      id: '2',
      title: 'Bat',
      highlight: 'Shop now',
      price: 700,
      img: '../../../assets/images/products/sports/bat.webp',
    },
    {
      id: '2',
      title: 'boll',
      highlight: 'Min 50% off',
      price: 500,
      img: '../../../assets/images/products/sports/boll.jpeg',
    },
    {
      id: '2',
      title: 'Badmintan',
      highlight: 'Aluminium batmintan',
      price: 700,
      img: '../../../assets/images/products/sports/badmentan.jpeg',
    },
    {
      id: '2',
      title: 'volleyball',
      highlight: 'Min 60% off ',
      price: 700,
      img: '../../../assets/images/products/sports/volleyball.jpeg',
    },
  ];
}
