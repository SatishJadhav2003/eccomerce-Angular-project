import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {

  id: string;
  category: string;
  product:Product;
  viewMore:Boolean = false;
  viewAllComments:Boolean=false;
  relatedProducts:Product[];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router:Router
  ) {

  }

  ngOnInit()
  {
    this.route.firstChild.paramMap.subscribe((res) => {
      this.category = res.get('category');
      this.id = res.get('id');
      console.log(this.id);
      // get product by id
     this.productService.getProductById(this.id);
     this.productService.cuuProduct.subscribe((product)=>{
      this.product = product;
      // getting related products
      this.productService.getRelatedProducts(this.product.category_id).subscribe((res)=>{
        console.log("related products",res);
        this.relatedProducts = res;
      });
     })
    });
  }


  viewMoreDetails()
  {
    this.viewMore = !this.viewMore;
  }

  viewAllComment()
  {
    this.viewAllComments = !this.viewAllComments;
  }

  viewProduct(subcategory:string,id:string)
  {
    this.router.navigate(['/product',this.category,subcategory,id]);
    window.scrollTo(0,0);
  }
}
