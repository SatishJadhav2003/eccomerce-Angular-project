import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  totalProducts: Number;
  products: Product[];
  sortingMethods = [
    {
      id: '5',
      name: 'Customer Ratings',
      value: 'rating',
    },
    {
      id: '1',
      name: 'Price-- Low to High',
      value: 'low',
    },
    {
      id: '2',
      name: 'Price-- High to low',
      value: 'high',
    },
    {
      id: '3',
      name: 'Popularity',
      value: 'popularity',
    }
  ];
  currSort: string = this.sortingMethods[0].value;
  constructor(private prodctService: ProductService) {
    //Getting products from service
    this.prodctService.products.subscribe((res) => {
      this.products = res;
    });

    //getting count of products
    this.prodctService.productfound.subscribe((res) => {
      this.totalProducts = res;
    });
  }

  onSort(event: any) {
    this.currSort = event;
    switch (event) {
      case 'rating': {
        console.log(event);
        this.prodctService.products.next(
          this.products.sort((a, b) => b.rating - a.rating)
        );
        break;
      }

      case 'high': {
        console.log(event);
        this.prodctService.products.next(
          this.products.sort((a, b) => b.price - a.price)
        );
        break;
      }
      case 'low': {
        console.log(event);
        this.prodctService.products.next(
          this.products.sort((a, b) => a.price - b.price)
        );
        break;
      }

      case 'popularity': {
        console.log(event);
        this.prodctService.products.next(
          this.products.sort((a, b) => {
            if (b.sellUnit === a.sellUnit) {
              return b.rating - a.rating;
            }
            return b.sellUnit - a.sellUnit;
          })
        );
        break;
      }
      default: {
        console.log('wrong choice');
        break;
      }
    }
  }
}
