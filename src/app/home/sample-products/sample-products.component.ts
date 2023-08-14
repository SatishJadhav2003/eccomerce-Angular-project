import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { Category } from 'src/app/shared/models/models';

@Component({
  selector: 'app-sample-products',
  templateUrl: './sample-products.component.html',
  styleUrls: ['./sample-products.component.css'],
})
export class SampleProductsComponent implements OnInit {
  category: Category[];
  index: string;

  constructor(private service: CommonService) {}

  ngOnInit(): void {
    if (!this.service.category) {
      this.service.getCategoriesFromServer();
      this.service.categories.subscribe((cate) => {
        this.category = cate.slice(0,6);
      });
    } else {
      this.category = this.service.category.slice(0,6);
      console.log('from else in sample products');
    }
  }

}
