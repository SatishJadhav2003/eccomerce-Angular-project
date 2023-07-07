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
  panelOpenState=false;
  isMobile=false;
  category: Category[];
  index: string;
  currentCate: any;
  subcription: Subscription;

  constructor(
    private service: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if(window.innerWidth < 1000)
    {
    this.isMobile = true;
    }
    this.service.getCategoriesFromServer();
    // this.service.getMongoCate();
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
  onChangeCategory(name: any) {
    this.panelOpenState = false;
    console.log(this.panelOpenState)
    this.router.navigate(['/main-categories', name]);
  }
}
