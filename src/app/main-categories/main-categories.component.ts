import { Component } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../shared/models/models';

@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.css'],
})
export class MainCategoriesComponent {
  category: Category[];
  index: number;
  currentCate: any;
  constructor(
    private service: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.category = this.service.getCategory();
    this.route.paramMap.subscribe((paramMap) => {
      // + sign converts string to int
      this.index = +paramMap.get('id');
      this.currentCate = this.index;
      this.service.getCategoriesByIndex(this.index);
    });
  }

  // on clicking sidenavbar item this function will call to navigate
  onChangeCategory(index: any) {
    this.router.navigate(['/main-categories', index]);
  }
}
