import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchquery:string = '';
  product:Product[];
  isLoading = false;
  constructor(private route:ActivatedRoute,private productService:ProductService) {
    this.isLoading = true;
    this.route.params.subscribe((res)=>{
      console.log(res['searchquery']);
      this.searchquery = res['searchquery'];
      this.productService.searchProducts(this.searchquery).subscribe((products)=>{
        console.log(products);
        if (products.length >0) {
        this.product = products;
        } else {
          this.product = null;
        }
        this.isLoading = false
      })
    })

  };
}
