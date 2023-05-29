import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products_type = [
    {
      name:"bat",
      img:"../../../assets/images/products/sports/bat.webp"
    },{
      name:"boll",
      img:"../../../assets/images/products/sports/boll.jpeg"
    },{
      name:"gloves",
      img:"../../../assets/images/products/sports/gloves.webp"
    },{
      name:"pads",
      img:"../../../assets/images/products/sports/pads.webp"
    },{
      name:"bat",
      img:"../../../assets/images/products/sports/bat.webp"
    },{
      name:"bat",
      img:"../../../assets/images/products/sports/bat.webp"
    },{
      name:"bat",
      img:"../../../assets/images/products/sports/bat.webp"
    },
  ]

}
