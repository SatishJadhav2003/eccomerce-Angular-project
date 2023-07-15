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
  panelOpenState=false;
  isMobile=false;
  category: Category[];
  index: string;
  currentCate: any;

  constructor(
    private service: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if(window.innerWidth < 1000)
    {
    this.isMobile = true;
    }

    if (!this.service.category) {
      this.service.getCategoriesFromServer();
      this.service.categories.subscribe((cate) => {
        this.category = cate;
        console.log(this.category);
      });
    } else {
      this.category = this.service.category;
      console.log('from else in main categories components');
    }
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
  onChangeCategory(name: any) {
    this.panelOpenState = false;
    console.log(this.panelOpenState)
    this.router.navigate(['/main-categories', name]);
  }
}
