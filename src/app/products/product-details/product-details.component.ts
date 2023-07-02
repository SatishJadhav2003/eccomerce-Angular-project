import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {

  id: string;
  id1: string;
  product:Product;
  viewMore:Boolean = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit()
  {
    this.route.firstChild.paramMap.subscribe((res) => {
      this.id = res.get('id');
      console.log(this.id);
     this.productService.getProductById(this.id);
     this.productService.cuuProduct.subscribe((product)=>{
      this.product = product;
      console.log(this.product);
     })
    });
  }


  viewMoreDetails()
  {
    this.viewMore = !this.viewMore;
  }
}
