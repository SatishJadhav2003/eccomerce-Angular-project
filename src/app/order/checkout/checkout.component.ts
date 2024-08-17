import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import {
  CartProducts,
  Order,
  orderProducts,
} from 'src/app/shared/models/models';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  userName: string = '';
  userMobile: number = 0;
  address1:string;
  city:string;
  state:string;
  postal_code:number;

  productId: string;
  address = false;
  products: CartProducts[] = [];
  total_amount: number = 0;
  total_MRP: number = 0;
  productsInfo: orderProducts[] = [];
  pattern = '[7-9]{1}[0-9]{9}';
  payment = 'cod';

  // Shipping address form
  addressForm: FormGroup;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {

    this.route.params.subscribe((params) => {
      // if product from view component this code will execute
      if (params['id']) {
        this.productId = params['id'];
        this.productService.getProductById(this.productId).subscribe((res) => {
          const product: CartProducts = {
            product_id: this.productId,
            quantity: 1,
            title: res.title,
            price: res.price,
            MRP: res.MRP,
            image: res.images,
          };
          this.products.push(product);
          this.total_MRP = res.MRP;
          this.total_amount = res.price;
        });
      } else {
        // if products from cart this code will execute
        if (userService.cartProducts) {
          console.log(userService.cartProducts);
          this.products = userService.cartProducts;
          this.products.forEach((item) => {
            this.total_MRP += item.MRP * item.quantity;
            this.total_amount += item.price * item.quantity;
          });
        } else {
          this.userService.getCartProducts().subscribe((res) => {
            console.log('getting from server ', res);
            this.products = res;
            this.products.forEach((item) => {
              this.total_MRP += item.MRP * item.quantity;
              this.total_amount += item.price * item.quantity;
            });
          });
        }
      }
    });



    // Get user information stored in local storage
     const user = JSON.parse(localStorage.getItem('userData'));
     this.userName = user.name;
     this.userMobile = user.mobile;
     if(user.address)
     {
       this.address1 = user.address.address1;
       this.city = user.address.city;
       this.state = user.address.state;
       this.postal_code = user.address.postal_code;
     }
     console.log(user);



     // Shipping address form
    this.addressForm = this.fb.group({
      name: [this.userName, Validators.required],
      mobile: [
        this.userMobile,
        [Validators.required, Validators.pattern(this.pattern)],
      ],
      address: [this.address1, Validators.required],
      city: [this.city],
      state: [this.state, Validators.required],
      postalCode: [
        this.postal_code
        ,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ]),
      ],
      shipping: ['home', Validators.required],
    });
  }

  removeProduct(index: number) {
    this.dialog
      .open(DialogComponent, {
        data: {
          heading: 'Remove Item',
          msg: 'Are you sure you want to remove this item?',
          action: 'REMOVE',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.total_MRP -=
            this.products[index].MRP * this.products[index].quantity;
          this.total_amount -=
            this.products[index].price * this.products[index].quantity;
          this.products.splice(index, 1);
          console.log(this.products);
          console.log(this.userService.cartProducts);
        }
      });
  }

  onSubmitAddressForm() {
    console.table(this.addressForm.value);
  }

  states: { name: string; abbreviation: string }[] = [
    { name: 'Andhra Pradesh', abbreviation: 'AP' },
    { name: 'Arunachal Pradesh', abbreviation: 'AR' },
    { name: 'Assam', abbreviation: 'AS' },
    { name: 'Bihar', abbreviation: 'BR' },
    { name: 'Chhattisgarh', abbreviation: 'CG' },
    { name: 'Goa', abbreviation: 'GA' },
    { name: 'Gujarat', abbreviation: 'GJ' },
    { name: 'Haryana', abbreviation: 'HR' },
    { name: 'Himachal Pradesh', abbreviation: 'HP' },
    { name: 'Jharkhand', abbreviation: 'JH' },
    { name: 'Karnataka', abbreviation: 'KA' },
    { name: 'Kerala', abbreviation: 'KL' },
    { name: 'Madhya Pradesh', abbreviation: 'MP' },
    { name: 'Maharashtra', abbreviation: 'MH' },
    { name: 'Manipur', abbreviation: 'MN' },
    { name: 'Meghalaya', abbreviation: 'ML' },
    { name: 'Mizoram', abbreviation: 'MZ' },
    { name: 'Nagaland', abbreviation: 'NL' },
    { name: 'Odisha', abbreviation: 'OR' },
    { name: 'Punjab', abbreviation: 'PB' },
    { name: 'Rajasthan', abbreviation: 'RJ' },
    { name: 'Sikkim', abbreviation: 'SK' },
    { name: 'Tamil Nadu', abbreviation: 'TN' },
    { name: 'Telangana', abbreviation: 'TG' },
    { name: 'Tripura', abbreviation: 'TR' },
    { name: 'Uttar Pradesh', abbreviation: 'UP' },
    { name: 'Uttarakhand', abbreviation: 'UK' },
    { name: 'West Bengal', abbreviation: 'WB' },
    { name: 'Andaman and Nicobar Islands', abbreviation: 'AN' },
    { name: 'Chandigarh', abbreviation: 'CH' },
    { name: 'Dadra and Nagar Haveli and Daman and Diu', abbreviation: 'DN' },
    { name: 'Delhi', abbreviation: 'DL' },
    { name: 'Lakshadweep', abbreviation: 'LD' },
    { name: 'Puducherry', abbreviation: 'PY' },
  ];

  async confirmOrder() {
    // getting user id
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    // extracting necessary info from products
    this.products.forEach((item) => {
      const info: orderProducts = {
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      };
      this.productsInfo.push(info);
    });
    const order: any = {
      user_id: userInfo._id,
      payment_mode: this.payment,
      products: this.productsInfo,
      shipping_add: {
        name: this.addressForm.value.name,
        mobile: this.addressForm.value.mobile,
        address: this.addressForm.value.address,
        city: this.addressForm.value.city,
        state: this.addressForm.value.state,
        postal_code: this.addressForm.value.postalCode,
        shipping_at: this.addressForm.value.shipping,
      },
    };
    console.log(order);
    this.userService.orderProducts(order).subscribe(async (res) => {
      console.log('product added Succefully', res);
      this.userService.productOrdered = res;
      // Removing all ordered products from cart
      if (!this.productId) {
        await res.products.forEach((item) => {
          this.userService
            .deleteCartProduct(item.product_id)
            .subscribe((res) => {
              console.log(res);
            });
        });
      }
      this.router.navigate(['/order-confirmed']);
    });
  }

  increment() {
    this.products[0].quantity++;
    this.total_MRP += this.products[0].MRP;
    this.total_amount += this.products[0].price;
  }
  decrement() {
    this.products[0].quantity--;
    this.total_MRP -= this.products[0].MRP;
    this.total_amount -= this.products[0].price;
  }

  valueChanged() {
    if (this.products[0].quantity <= 0) {
      this.dialog
        .open(DialogComponent, {
          data: {
            heading: 'Remove Item',
            msg: 'Do you want to remove this item ?',
            action: 'REMOVE',
          },
        })
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.router.navigate(['/product', this.productId]);
          } else {
            this.products[0].quantity = 1;
            this.total_MRP = this.products[0].MRP;
            this.total_amount = this.products[0].price;
          }
        });
    } else {
      this.total_MRP = this.products[0].quantity * this.products[0].MRP;
      this.total_amount = this.products[0].quantity * this.products[0].price;
    }
  }

  // logic for incrementing date
  incrementDate(date: Date, days: number) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  ngOnDestroy() {
    this.products = [];
  }
}
