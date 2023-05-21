import {
  Component,
  DoCheck,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css'],
})
export class HomeBannerComponent {

  banner_img: any = [
    {
      img: '../../../assets/images/big-billion-days.jpeg',
    },
    {
      img: '../../../assets/images/sale.jpeg',
    },
    {
      img: '../../../assets/images/final-sale.jpeg',
    },
  ];
}
