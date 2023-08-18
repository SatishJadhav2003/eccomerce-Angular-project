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
  isMobile: boolean = false;
  isLoading: boolean = false;
  constructor(private service: CommonService) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (window.innerWidth < 900) {
      this.isMobile = true;
    }
    if (!this.service.category) {
      this.service.getCategoriesFromServer();
      this.service.categories.subscribe((cate) => {
        this.category = cate.slice(0, 6);
        this.isLoading = false;
      });
    } else {
      this.category = this.service.category.slice(0, 6);
      console.log('from else in sample products');
      this.isLoading = false;
    }
  }
}
