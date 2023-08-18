import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { CartProducts } from 'src/app/shared/models/models';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  isMobile: boolean = false;
  id: string;
  category: string;
  product: Product;
  viewMore: Boolean;
  viewAllComments: Boolean;
  relatedProducts: Product[];
  recentlyViewed: Product[] = [];
  cartItem: any[];
  existInCart: Boolean;
  isInWishlist: boolean = false;
  userWishList: any[];
  isLoading = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackBarService,
    private userService: UserService,
    private authService:AuthService
  ) {}

  ngOnInit() {
this.isLoading = true;
    if (window.innerWidth < 900) {
      this.isMobile = true;
    }
    this.route.firstChild.paramMap.subscribe((res) => {
      // view more disabled
      this.viewMore = false;
      this.viewAllComments = false;
      this.existInCart = false;
      this.isInWishlist = false;

      // getting params
      this.category = res.get('category');
      this.id = res.get('id');
      console.log(this.id);
      // get product by id
      this.productService.getProductById(this.id).subscribe((product) => {
        this.product = product;
        this.isLoading = false;
        // getting related products
        this.productService
          .getRelatedProducts(this.product.category_id)
          .subscribe((res) => {
            console.log('related products', res);
            this.relatedProducts = res;
          });
      });

      if (this.authService.isLoggedIn) {

      // Checking whether product is present in cart or not
      this.userService.searchCartProduct(this.id).subscribe(
        (res) => {
          console.log(res);
          if (res) {
            this.existInCart = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );

      // Checking whether product is present in wishlist or not
      this.userService.searchWishlistProduct(this.id).subscribe(
        (res) => {
          if (res) {
            this.isInWishlist = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
      }


      // Adding to recently viewed
      this.addToRecentlyViewed(this.id);
    });
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
      product_id: this.product._id,
      quantity: 1,
      title: this.product.title,
      price: this.product.price,
      MRP: this.product.MRP,
      image: this.product.images,
    };
    this.userService.addToCart(data).subscribe((res) => {
      console.log(res);
      this.userService.cartProducts.push(res);
      this.snackBar.greenSnackBar('Added to cart', 'ok', 'done');
    });
    this.existInCart = true;
  }

  toggleWishlist(): void {
    if (!this.isInWishlist) {
      this.userService.addToWishList(this.id).subscribe(
        (res) => {
          console.log(res);
          this.snackBar.greenSnackBar('Added to wishlist', 'ok', 'done');
          this.isInWishlist = !this.isInWishlist;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.userService.deleteWishlistProduct(this.id).subscribe(
        (res) => {
          console.log(res);
          this.snackBar.redSnackBar(
            'Removed from wishlist',
            'ok',
            'delete_outline'
          );
          this.isInWishlist = !this.isInWishlist;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  async addToRecentlyViewed(productId: string): Promise<void> {
    const recentlyViewed = this.getRecentlyViewedProducts();
    // Check if the product ID already exists in the list
    const index = recentlyViewed.indexOf(productId);
    if (index !== -1) {
      recentlyViewed.splice(index, 1); // Remove the existing occurrence
    }
    // Add the new product ID to the beginning
    recentlyViewed.unshift(productId);
    // Ensure the list does not exceed the maximum items
    if(this.isMobile)
    {
      if (recentlyViewed.length > 5) {
        recentlyViewed.pop(); // Remove the oldest item
      }
    }
    else
    {
      if (recentlyViewed.length > 6) {
        recentlyViewed.pop(); // Remove the oldest item
      }
    }
    localStorage.setItem('recetlyViewed', JSON.stringify(recentlyViewed));

    // Fetch product data for recently viewed products
    const productPromises = recentlyViewed.map((recent) =>
      this.productService.getProductById(recent).toPromise()
    );

    try {
      const recentlyViewedProducts = await Promise.all(productPromises);
      this.recentlyViewed = recentlyViewedProducts;
    } catch (error) {
      console.error('Error fetching recently viewed products:', error);
      this.recentlyViewed = [];
    }
  }

  getRecentlyViewedProducts(): string[] {
    const recentlyViewed = localStorage.getItem('recetlyViewed');
    return recentlyViewed ? JSON.parse(recentlyViewed) : [];
  }
}
