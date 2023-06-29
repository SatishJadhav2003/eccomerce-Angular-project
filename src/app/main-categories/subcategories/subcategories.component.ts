import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { Category } from 'src/app/shared/models/models';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css'],
})
export class SubcategoriesComponent implements OnInit, DoCheck, OnDestroy {
  subCategories: any[] = [];
  public category: Category;
  index: number;
  subcription: Subscription;

  constructor(private service: CommonService, private route: ActivatedRoute,private router:Router) {
    this.subcription = this.service.currCateChanged.subscribe((cate) => {
      this.category = cate;
      this.extractSubCategories();
    });
  }
  ngDoCheck(): void {}

  ngOnInit(): void {}

  extractSubCategories() {
    this.subCategories = [];
    for (const subCategory of this.category.subCategories) {
      this.subCategories.push(subCategory);
    }
  }

  onSubcategory(parent: string,sub:string) {
    this.router.navigate(['/products/'+parent+"/"+sub]);
    console.log(parent+"/"+sub);
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
