import { Component } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { Router } from '@angular/router';

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
  orderDetails: any;
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
            qty: item.qty,
            price: item.price,
          });
          this.total += item.qty * item.price;
          this.totalMRP += item.qty * res.MRP;
          console.log(this.totalMRP);
        }),
          (err) => {
            console.log(err);
          };
      });
      this.id = this.orderDetails.id;
      this.ordered_date = this.orderDetails.ordered_date;
      // incrementing arrival date by 3 days
      this.arrival_date = this.incrementDate(this.orderDetails.ordered_date,3);
      this.shippingAdd = this.orderDetails.deliveryAdd;
      this.paymentMode = this.orderDetails.payment;
    }
    else{
      this.router.navigate(['/home']);
    }
  }


  // logic for incrementing date
  incrementDate(date:Date,days:number)
  {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
