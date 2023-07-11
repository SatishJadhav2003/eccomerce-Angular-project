import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartProducts } from 'src/app/shared/models/models';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  quantity: number = 1;
  productsInCart: CartProducts[];
  cartItems: any;
  selling_total_price: number = 0;
  Total_Amount: number = 0;
  Total_discount: number = 0;
  isChanged:Boolean=false;
  isMobile:Boolean=false;
  constructor(private productService: ProductService,private router:Router) {
    this.productService.getCartProducts().subscribe((res) => {
      this.cartItems = res;
      console.log(this.cartItems);
      this.productsInCart = res.products;
      res.products.forEach((item) => {
        this.Total_Amount += item.price * item.quantity;
        this.selling_total_price += item.MRP * item.quantity;
      });
    });
  }

  ngOnInit() {
    if(window.innerWidth<1000)
    {
      this.isMobile=true;
    }
  }
  increment(i: number) {
    this.productsInCart[i].quantity++;
    this.selling_total_price += this.productsInCart[i].MRP;
    this.Total_Amount += this.productsInCart[i].price;
    this.isChanged = true;
  }

  decrement(i: number) {
    this.productsInCart[i].quantity--;
    this.selling_total_price += this.productsInCart[i].MRP;
    this.Total_Amount += this.productsInCart[i].price;
    if (this.productsInCart[i].quantity == 0) {
      if (confirm('Do you want to remove this item from cart')) {
        this.productsInCart.splice(i, 1);
      } else {
        this.productsInCart[i].quantity++;
        this.selling_total_price -= this.productsInCart[i].MRP;
        this.Total_Amount -= this.productsInCart[i].price;

      }
    }
    this.isChanged = true;
  }

  removeProduct(index: number) {
    if (confirm('Do you want to remove this item from cart')) {
      this.productsInCart.splice(index, 1);
      this.isChanged = true;
    }
  }

  valueChanged(i:number)
  {
    this.isChanged =true;
    if(this.productsInCart[i].quantity<=0)
    {
      if (confirm('Do you want to remove this item from cart')) {
        this.productsInCart.splice(i, 1);
      }
      else{
        this.productsInCart[i].quantity =1
      }
    }
  }

  onProduct(id:string)
  {
    console.log(id);
    this.router.navigate(['/product',id]);
  }

  ngOnDestroy() {
    if(this.isChanged)
    {
      console.log('hello');
      this.cartItems.products = this.productsInCart;
      console.log(this.cartItems);
      this.productService.updateCart(this.cartItems);
    }

  }
}
