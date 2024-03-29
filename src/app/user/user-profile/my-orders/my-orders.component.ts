import { Component } from '@angular/core';
import { Order } from 'src/app/shared/models/models';
import { ProductService } from 'src/app/shared/services/product.service';
import { OrderHistory } from '../interfaces';
import { UserService } from '../../user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  userOrders: Order[];
  orders: OrderHistory[] = [];
  ratingValue: number = 0;
  review: string = '';
  rateProduct: boolean = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private snackbar:SnackBarService
  ) {}

  ngOnInit() {
    this.userService.getAllOrders().subscribe(
      (res) => {
        console.log(res);
        this.userOrders = res;
        this.extractProductsFromOrders().then(() => {
          this.orders.sort((a, b) => {
            return b.ordered_date.getTime() - a.ordered_date.getTime();
          });
        });

        console.log(this.orders);
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }

  extractProductsFromOrders(): Promise<void[]> {
    const promises: Promise<void>[] = [];
    this.userOrders.forEach((item) => {
      item.products.forEach((product) => {
        const promise = this.productService
          .getProductById(product.product_id)
          .toPromise()
          .then((productInfo) => {
            const temp: OrderHistory = {
              id: item._id,
              qty: product.quantity,
              status: item.status,
              shippingAdd: {
                name: item.shipping_add.name,
                mobile: item.shipping_add.mobile,
                address: item.shipping_add.address,
                city: item.shipping_add.city,
                state: item.shipping_add.state,
                postal_code: item.shipping_add.postal_code,
                shipping: item.shipping_add.shipping_at,
              },
              product: {
                id: productInfo._id,
                title: productInfo.title,
                img: productInfo.images,
                price: product.price,
              },
              payment_mode: item.payment_mode,
              ordered_date: new Date(item.order_date),
              delivery_date: new Date(item.delivery_date),
            };
            this.orders.push(temp);
          });
        promises.push(promise);
      });
    });
    return Promise.all(promises);
  }

  toggeleRateProduct(id:string) {
    this.rateProduct = !this.rateProduct;
    this.productService.searchReview(id).subscribe((reviewed)=>{
      console.log(reviewed);
      this.ratingValue = reviewed.rating;
      this.review = reviewed.comment;
    })
  }

  rating(id: string) {
    console.log(id);
    const user = JSON.parse(localStorage.getItem('userData'));
    const data = {
      // product_id, rating, comment, user_name
      product_id: id,
      rating: this.ratingValue,
      comment: this.review,
      user_name: user.name,
    };
    this.productService.rateProduct(data).subscribe((res) => {
      if (res) {
        this.snackbar.greenSnackBar("Thank you for your review",'ok','done');
      }
      else
      {
        this.snackbar.redSnackBar(res,'ok','close');
      }
    },err =>{
      console.log(err)
      this.snackbar.redSnackBar(err.error,'ok','close');
    });
    this.rateProduct = false;
  }
}
