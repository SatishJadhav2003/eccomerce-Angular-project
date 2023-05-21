import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{
  ngDoCheck(): void {
    console.log(this.screenWidth)
    if (this.screenWidth < 900) {
      this.mobile = true;
    }
  }
  title = 'farmers-market';

  public screenWidth= screen.width;
  mobile:Boolean;

  ngOnInit() {

  }
}
