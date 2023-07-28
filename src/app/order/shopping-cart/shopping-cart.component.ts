import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { CartProducts } from 'src/app/shared/models/models';
import { ProductService } from 'src/app/shared/product.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  quantity: number = 1;
  productsInCart: CartProducts[];
  MRP: number = 0;
  Total_Amount: number = 0;
  Total_discount: number = 0;
  isMobile: Boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    public snackbar: SnackBarService,
    public dialog: MatDialog
  ) {
    // getting carts all products
    this.productService.getCartProducts().subscribe((res) => {
      this.productsInCart = res;
      this.productsInCart.forEach((item) => {
        this.Total_Amount += item.price * item.quantity;
        this.MRP += item.MRP * item.quantity;
      });
    });
  }

  ngOnInit() {
    if (window.innerWidth < 1000) {
      this.isMobile = true;
    }
  }

  // incrementing quantity
  increment(i: number) {
    this.productsInCart[i].quantity++;
    this.MRP += this.productsInCart[i].MRP;
    this.Total_Amount += this.productsInCart[i].price;
    this.updateProduct(this.productsInCart[i]);
  }

  // reduncing quantity
  decrement(i: number) {
    this.productsInCart[i].quantity--;

    // cheking for if there quantity is zero then user want to remove product or not
    if (this.productsInCart[i].quantity == 0) {
      this.dialog
        .open(DialogComponent, {
          width: '600px',
          data: {
            heading: 'Remove Item',
            msg: 'Do you want to remove this item from cart ?',
            action: 'REMOVE',
          },
        })
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.productService
              .deleteCartProduct(this.productsInCart[i].id)
              .subscribe((res) => {
                console.log('removed');
                this.MRP -= this.productsInCart[i].MRP;
                this.Total_Amount -= this.productsInCart[i].price;
                this.productsInCart.splice(i, 1);
                this.productService.cartProducts = this.productsInCart;
              });
          } else {
            this.productsInCart[i].quantity++;
          }
        });
    } else {
      // if product quiantity is not zero  || greater than 1
      this.updateProduct(this.productsInCart[i]);
      this.MRP -= this.productsInCart[i].MRP;
      this.Total_Amount -= this.productsInCart[i].price;
    }
  }

  // for removing product from cart
  removeProduct(index: number) {
    this.dialog
      .open(DialogComponent, {
        data: {
          heading: 'Remove Item',
          msg: 'Do you want to remove this item from cart ?',
          action: 'REMOVE',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.productService
            .deleteCartProduct(this.productsInCart[index].id)
            .subscribe((res) => {
              console.log('removed');
              this.snackbar.redSnackBar('Deleted successfully', 'ok', 'delete');
              // calculating total price after removed item
              this.Total_Amount -=
                this.productsInCart[index].price *
                this.productsInCart[index].quantity;
              this.MRP -=
                this.productsInCart[index].MRP *
                this.productsInCart[index].quantity;
              this.productsInCart.splice(index, 1);
              this.productService.cartProducts = this.productsInCart;
            });
        }
      });
  }

  //on changing input value checks for zero quantity
  valueChanged(index: number) {
    if (this.productsInCart[index].quantity <= 0) {
      this.dialog
        .open(DialogComponent, {
          data: {
            heading: 'Remove Item',
            msg: 'Do you want to remove this item from cart ?',
            action: 'REMOVE',
          },
        })
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.productService
              .deleteCartProduct(this.productsInCart[index].id)
              .subscribe((res) => {
                console.log('removed');
                this.Total_Amount -=
                  this.productsInCart[index].price *
                  this.productsInCart[index].quantity;
                this.MRP -=
                  this.productsInCart[index].MRP *
                  this.productsInCart[index].quantity;
                this.productsInCart.splice(index, 1);
                this.productService.cartProducts = this.productsInCart;
              });
          } else {
            this.productsInCart[index].quantity = 1;
            this.updateProduct(this.productsInCart[index]);
            this.Total_Amount = 0;
            this.MRP = 0;
            this.productsInCart.forEach((item) => {
              this.Total_Amount += item.price * item.quantity;
              this.MRP += item.MRP * item.quantity;
            });
          }
        });
    } else {
      this.updateProduct(this.productsInCart[index]);
      this.Total_Amount = 0;
      this.MRP = 0;
      this.productsInCart.forEach((item) => {
        this.Total_Amount += item.price * item.quantity;
        this.MRP += item.MRP * item.quantity;
      });
    }
  }

  // navigating toward different related product
  onProduct(id: string) {
    console.log(id);
    this.router.navigate(['/product', id]);
  }

  // updating cart item
  updateProduct(product: CartProducts) {
    this.productService.updateCart(product).subscribe((res) => {
      console.log(res);
      this.productService.cartProducts = this.productsInCart;
    });
  }
}
