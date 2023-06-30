import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Subcategory } from 'src/app/shared/models/models';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  currType: string;
  products: Product[];
  category: string;
  subcategory: string;
  currProducts:Product[];
  subCategoryName:string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,

  ) {
    this.route.firstChild.params.subscribe((params) => {
    this.subCategoryName = params['subcategory'];
    this.productService
    .getProductsBasedOnSubcategory(this.subCategoryName);
    this.productService.products.subscribe((res) => {
      console.log("from products list component",res);
      this.products = res.sort((a, b) => b.rating - a.rating);

    });
  })
    // this.productService.getProducts();

  }

  ngOnInit() {
    this.productService.currType.subscribe((res) => {
      console.log(res);
    });
  }

  product_info(data) {
    console.log(data);
  }
}