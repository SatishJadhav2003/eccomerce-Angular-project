import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
allProducts:Product[];
products = new Subject<Product[]>();
currType = new Subject<string>();
allTypes = new Subject<any>();

 api= 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  //Getting all products
  getProducts()
  {
    this.http.get<Product[]>(`${this.api}`).subscribe((res)=>{
      console.log(res);
      this.allProducts =res;
      this.products.next(res);
    })
  }

  newType(type:string)
  {
    this.currType.next(type);
  }


  //Getting products based on name
  getProductByName(name:string)
  {
    this.http.get<any>(`${this.api}?name=${name}`)
    .subscribe(
      (response) => {
        console.log(response);
        this.products.next(response);
      }
    );
  }

  //Getting products based on category id
  getProductsBasedOnSubcategory(subCategory:string)
  {

    this.http.get<any>(`${this.api}?category_id=${subCategory}`).subscribe((res)=>
    {
      this.products.next(res);
    })
  }

}
