import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { CartProducts } from 'src/app/shared/models/models';
import { ProductService } from 'src/app/shared/services/product.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  quantity: number = 1;
  productsInCart: any[] = [];
  MRP: number = 0;
  Total_Amount: number = 0;
  Total_discount: number = 0;
  isMobile: Boolean = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    public snackbar: SnackBarService,
    public dialog: MatDialog
  ) {
    // getting carts all products
    // if (this.userService.cartProducts.length > 0) {
    //   const products: any = this.userService.cartProducts;
    //   console.log("from stored ",products);
    //   products.forEach((item)=>{
    //     this.productsInCart.push(item);
    //     this.Total_Amount += products.price * products.quantity;
    //     this.MRP += products.MRP * products.quantity;
    //   })
    // } else {

    // removing all cartproduct stored in service
    this.userService.cartProducts = [];

    // Getting all cart products
    this.userService.getCartProducts().subscribe((res) => {
      console.log(res);
      res.forEach((item) => {
        console.log(item.product_id);
        this.productService
          .getProductById(item.product_id)
          .subscribe((product) => {
            const temp = {
              product_id: item.product_id,
              image: product.images[0],
              title: product.title,
              quantity: item.quantity,
              price: product.price,
              MRP: product.MRP,
            };
            this.userService.cartProducts.push(temp);
            this.productsInCart.push(temp);
            this.Total_Amount += temp.price * temp.quantity;
            this.MRP += temp.MRP * temp.quantity;
          });
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
            this.userService
              .deleteCartProduct(this.productsInCart[i].id)
              .subscribe((res) => {
                console.log('removed');
                this.MRP -= this.productsInCart[i].MRP;
                this.Total_Amount -= this.productsInCart[i].price;
                this.productsInCart.splice(i, 1);
                this.userService.cartProducts = this.productsInCart;
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
          this.userService
            .deleteCartProduct(this.productsInCart[index].product_id)
            .subscribe((res) => {
              console.log('removed');
              this.snackbar.redSnackBar(
                'Item Removed from cart',
                'ok',
                'delete_forever'
              );
              this.userService.cartProducts.splice(index, 1);
              // calculating total price after removed item
              this.Total_Amount -=
                this.productsInCart[index].price *
                this.productsInCart[index].quantity;
              this.MRP -=
                this.productsInCart[index].MRP *
                this.productsInCart[index].quantity;
              this.productsInCart.splice(index, 1);
              this.userService.cartProducts = this.productsInCart;
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
            this.userService
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
                this.userService.cartProducts = this.productsInCart;
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
    const data = {
      product_id: product.product_id,
      quantity: product.quantity,
    };
    this.userService.updateCart(data).subscribe((res) => {
      console.log(res);
      this.userService.cartProducts = this.productsInCart;
    });
  }
}
