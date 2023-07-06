import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { Subcategory } from '../shared/models/models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  totalProducts: Number;
  products: Product[];
  subCategories:Subcategory[];
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
  currCate:string;
  currSubCate:string;
  constructor(private prodctService: ProductService,private route:ActivatedRoute,private service:CommonService,private router:Router) {
    //Getting products from service
    this.prodctService.products.subscribe((res) => {
      this.products = res;
    });

    //getting count of products
    this.prodctService.productfound.subscribe((res) => {
      this.totalProducts = res;
    });

    // geting subcategories of category
    this.route.firstChild.paramMap.subscribe((params)=>{
      this.currCate = params.get('category');
      this.currSubCate = params.get('subcategory');
      this.service.getSubcategories(params.get('category')).subscribe
      ((res)=>{
        console.log(res);
        this.subCategories = res;
      });
    })
  }


  // Sorting logic
  onSort(event: any) {
    this.currSort = event;
    switch (event) {
      case 'rating': {
        console.log("rating",event);
        this.prodctService.products.next(
          this.products.sort((a, b) => b.rating - a.rating)
        );
        break;
      }
      case 'high': {
        console.log("high",event);
        this.prodctService.products.next(
          this.products.sort((a, b) => b.price - a.price)
        );
        break;
      }
      case 'low': {
        console.log("low",event);
        this.prodctService.products.next(
          this.products.sort((a, b) => a.price - b.price)
        );
        break;
      }

      case 'popularity': {
        console.log("popularity",event);
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


  onChangeSubCate(subCateId:string)
  {
    console.log(subCateId);
    this.router.navigate(['/products',this.currCate,subCateId]);
  }
}
