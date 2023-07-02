import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { Category } from 'src/app/shared/models/models';

@Component({
  selector: 'app-sample-products',
  templateUrl: './sample-products.component.html',
  styleUrls: ['./sample-products.component.css']
})
export class SampleProductsComponent implements OnInit {

  category: Category[];
  index: string;

  constructor(
    private service: CommonService
  ) {
    this.service.getCategoriesFromServer();
    this.service.categories.subscribe((cate) => {
      this.category = cate;
      console.log(this.category);

    });
  }

  ngOnInit(): void {
  }


}
