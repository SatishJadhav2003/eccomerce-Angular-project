import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { Category } from 'src/app/shared/models/models';

@Component({
  selector: 'app-sample-products',
  templateUrl: './sample-products.component.html',
  styleUrls: ['./sample-products.component.css']
})
export class SampleProductsComponent implements OnInit {

  category: Category[];
  index: string;

  constructor(
    private service: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.service.getCategoriesFromServer();
    this.service.categories.subscribe((cate) => {
      this.category = cate;
      console.log(this.category);

    });
  }

  ngOnInit(): void {
  }

  products: any = [
    {
      id: '2',
      title: 'Shirt',
      highlight: 'From ₹899 only',
      price: 899,
      img: 'https://5.imimg.com/data5/DY/PO/MY-37950609/casual-shirt-1-500x500.jpg',
    },
    {
      id: '2',
      title: 'Glasses',
      highlight: 'Shop now',
      price: 1299,
      img: 'https://m.media-amazon.com/images/I/61o4qyrftQL._UX569_.jpg',
    },
    {
      id: '2',
      title: 'bagpack',
      highlight: 'Min 50% off',
      price: 999,
      img: 'https://m.media-amazon.com/images/I/31JkPf8f3FL.jpg',
    },
    {
      id: '2',
      title: 'Shoes',
      highlight: 'Min 40% off',
      price: 3499,
      img: 'https://m.media-amazon.com/images/I/61kvlLcFVpL._UL1500_.jpg',
    },
    {
      id: '2',
      title: 'Wallet',
      highlight: 'Min 60% off ',
      price: 699,
      img: 'https://m.media-amazon.com/images/I/81nmscKwWkS._SX450_.jpg',
    },
  ];
}
