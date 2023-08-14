import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css'],
})
export class HomeBannerComponent {

  banner_img: any = [
    {
      img: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/84ae27f93c14a4e3.jpg?q=20',
    },
    {
      img: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/d417c02a9cc69fda.jpg?q=20',
    },
    {
      img: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/84ae27f93c14a4e3.jpg?q=20',
    },
    {
      img:'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/d417c02a9cc69fda.jpg?q=20'
    }
  ];
}
