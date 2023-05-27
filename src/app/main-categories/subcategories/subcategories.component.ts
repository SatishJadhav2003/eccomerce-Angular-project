import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { Category } from 'src/app/shared/models/models';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css'],
})
export class SubcategoriesComponent implements OnInit, DoCheck,OnDestroy {
  subCategories: any[] = [];
  public category: Category;
  index = '4';
  subcription: Subscription;

  constructor(private service: CommonService, private route: ActivatedRoute) {
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

  ngOnDestroy()
  {
    this.subcription.unsubscribe();
  }
}
