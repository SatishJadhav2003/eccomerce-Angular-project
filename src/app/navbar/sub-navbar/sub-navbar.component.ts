import { Component } from '@angular/core';
import { Category } from 'src/app/shared/models/models';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-sub-navbar',
  templateUrl: './sub-navbar.component.html',
  styleUrls: ['./sub-navbar.component.css']
})
export class SubNavbarComponent {
  category:Category[];
  constructor(private commonService:CommonService){
    if (!this.commonService.category) {
      this.commonService.getCategoriesFromServer();
      this.commonService.categories.subscribe((cate) => {
        this.category = cate.slice(0,7);
      });
    } else {
      this.category = this.commonService.category.slice(0,7);;
      console.log('from else in sample products');
    }
  }
}
