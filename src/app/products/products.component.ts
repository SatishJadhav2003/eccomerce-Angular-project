import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Subcategory } from '../shared/models/models';
import { CommonService } from '../shared/common.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  private category: Category;
  categoryName: string;
  subCategoryName: string;
  subCategories: Subcategory[] = [];
  types: any[] = [];
  currType: string;
  temp: any;
  currSubCate: any;
  panelOpenState = false;
  constructor(
    private route: ActivatedRoute,
    private service: CommonService,
    private router: Router,
    private prodctService: ProductService
  ) {
    // getting parameters from URl
    this.route.firstChild.params.subscribe((params) => {
      this.categoryName = params['category'];
      this.subCategoryName = params['subcategory'];
      this.currSubCate = this.subCategoryName;

      // getting category from service
      this.service.cateByName.subscribe((cate) => {
        this.category = cate;
        this.extractSubCategories();
        this.extractTypes(this.subCategoryName);
      });
    });
  }

  // Extracting subcategories from category
  extractSubCategories() {
    this.subCategories = [];
    for (const subCategory of this.category[0].subCategories) {
      this.subCategories.push(subCategory);
    }
  }

  // Extracting types of subCategory
  extractTypes(name: string) {
    this.temp = this.subCategories.find(
      (subcategory) => subcategory.name === name
    );
    if (this.temp) {
      this.types = [];
      this.prodctService.newType(this.temp.types[0]);
      console.log('Subcategory:', this.temp);
      for (const type of this.temp.types) {
        this.types.push(type);
      }
    } else {
      console.log('Subcategory not found');
    }
  }

  // Changing category
  changeSubCategory(subCate: string) {
    this.prodctService.getProducts();
    this.router.navigate(['/products/' + this.categoryName + '/' + subCate]);
  }

  onChangeType(type: string) {
    console.log(type);
    this.prodctService.newType(type);
    this.prodctService.getProductByName(type);
  }
}
