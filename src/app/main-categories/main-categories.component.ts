import { Component } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../shared/models/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.css'],
})
export class MainCategoriesComponent {
  category: Category[];
  index: string;
  currentCate: any;
  subcription: Subscription;

  constructor(
    private service: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.service.getCategoriesFromServer();
    this.service.categories.subscribe((cate) => {
      this.category = cate;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.index = paramMap.get('id');
      this.currentCate = this.index;
      console.log(this.index);
      this.service.getCategoriesByIndex(this.index);
    });
  }

  // on clicking sidenavbar item this function will call to navigate
  onChangeCategory(index: any) {
    this.router.navigate(['/main-categories', index]);
  }
}
