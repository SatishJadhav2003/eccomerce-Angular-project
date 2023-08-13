import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  product: Product[] = [];

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {
    this.userService.getWishlist().subscribe((res) => {
      console.log(res);
      this.product = [];
      res.forEach((item) => {
        this.productService
          .getProductById(item.product_id)
          .subscribe((products) => {
            this.product.push(products);
          });
      });
    });
  }
}
