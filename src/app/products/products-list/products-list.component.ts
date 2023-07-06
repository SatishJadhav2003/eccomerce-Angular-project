import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  subcategory: string;
  category: string;
  subCategoryName: string;
  productsCount: number;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.route.firstChild.params.subscribe((params) => {
      this.category = params['category'];
      this.subCategoryName = params['subcategory'];
      this.productService.getProductsBasedOnSubcategory(this.subCategoryName).subscribe
      ((res)=>{
        console.log('from products list component', res);
        this.products = res;
        this.productsCount = this.products.length;

        // Passing products for parent component
        this.productService.products.next(res);
        this.productService.productfound.next(this.productsCount);
      });
    });
  }

  product_info(id: string) {
    this.router.navigate(['/product', this.category, this.subCategoryName, id]);
  }
}
