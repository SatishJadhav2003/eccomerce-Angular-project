import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
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
  product: Product;
  viewMore: Boolean;
  viewAllComments: Boolean;
  relatedProducts: Product[];
  cartItem:any[];
  existInCart:Boolean=false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.firstChild.paramMap.subscribe((res) => {
      // view more disabled
      this.viewMore = false;
      this.viewAllComments = false;

      // getting params
      this.category = res.get('category');
      this.id = res.get('id');
      console.log(this.id);
      // get product by id
      this.productService.getProductById(this.id).subscribe((product) => {
        this.product = product;
        // getting related products
        this.productService
          .getRelatedProducts(this.product.category_id)
          .subscribe((res) => {
            console.log('related products', res);
            this.relatedProducts = res;
          });
      });

      // Checking whether product is present in cart or not
      this.productService
        .getCartProducts()
        .pipe(
          map((res) => {
            this.cartItem=res;
            return res.products;
          })
        )
        .subscribe((cartProducts) => {
          console.log(cartProducts);
          cartProducts.forEach(item => {
            if(item.product_id==this.id)
            {
              this.existInCart=true;
              console.log("Exist")
            }
          });
        });
    });
  }

  viewMoreDetails() {
    this.viewMore = !this.viewMore;
  }

  viewAllComment() {
    this.viewAllComments = !this.viewAllComments;
  }

  viewProduct(subcategory: string, id: string) {
    if (this.category) {
      this.router.navigate(['/product', this.category, subcategory, id]);
    } else {
      // This is write for when we comes from cart component thei is category id is not available so for that we can use directly :id route
      this.router.navigate(['/product', id]);
    }
    window.scrollTo(0, 0);
  }

  addToCart()
  {

  }
}
