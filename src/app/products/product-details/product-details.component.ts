import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartProducts } from 'src/app/shared/models/models';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/product.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

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
  cartItem: any[];
  existInCart: Boolean;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:SnackBarService
  ) {}

  ngOnInit() {
    this.route.firstChild.paramMap.subscribe((res) => {
      // view more disabled
      this.viewMore = false;
      this.viewAllComments = false;
      this.existInCart = false;

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
      this.productService.getCartProducts().subscribe((cartProducts) => {
        this.cartItem = cartProducts;
        console.log(cartProducts);
        cartProducts.forEach((item) => {
          if (item.product_id == this.id) {
            this.existInCart = true;
            console.log('Exist');
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

  addToCart() {
    const data: CartProducts = {
      id: null,
      product_id: this.product.id,
      quantity: 1,
      title: this.product.title,
      price: this.product.price,
      MRP: this.product.actual_price,
      image: this.product.images,
    };
    this.productService.addToCart(data).subscribe((res) => {
      console.log(res);
      this.productService.cartProducts.push(res);
      this.snackBar.greenSnackBar("Added to cart","ok","done");
    });
    this.existInCart = true;
  }
}
