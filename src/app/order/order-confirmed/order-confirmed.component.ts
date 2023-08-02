import { Component } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/models';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class OrderConfirmedComponent {
  orderDetails: Order;
  id: string;
  ordered_date: Date;
  arrival_date: Date;
  shippingAdd: any;
  products: Product[] = [];
  productsQty: any[] = [];
  paymentMode: string;
  subtotal: number = 0;
  total: number = 0;
  totalSaved: number = 0;
  totalMRP: number = 0;
  constructor(public productService: ProductService,private router:Router) {}

  ngOnInit() {
    if (this.productService.productOrdered) {
      console.log(this.productService.productOrdered);
      this.orderDetails = this.productService.productOrdered;
      this.orderDetails.products.forEach((item) => {
        this.productService.getProductById(item.product_id).subscribe((res) => {
          this.products.push(res);
          this.productsQty.push({
            qty: item.quantity,
            price: item.price,
          });
          this.total += item.quantity * item.price;
          this.totalMRP += item.quantity * res.MRP;
          console.log(this.totalMRP);
        }),
          (err) => {
            console.log(err);
          };
      });
      this.id = this.orderDetails.id;
      this.ordered_date = this.orderDetails.order_date;
      this.arrival_date = this.orderDetails.delivery_date
      this.shippingAdd = this.orderDetails.shipping_add;
      this.paymentMode = this.orderDetails.payment_mode;
    }
    else{
      this.router.navigate(['/home']);
    }
  }
}
