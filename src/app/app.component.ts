import { Component, DoCheck, OnInit } from '@angular/core';
import { CommonService } from './shared/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public screenWidth = screen.width;
  mobile: Boolean;
  constructor(private service: CommonService) {
    if (this.screenWidth < 900) {
      this.mobile = true;
      this.service.mobile = true;
      this.service.getCategoriesFromServer();
    }
  }
  ngOnInit() {

  }
}
