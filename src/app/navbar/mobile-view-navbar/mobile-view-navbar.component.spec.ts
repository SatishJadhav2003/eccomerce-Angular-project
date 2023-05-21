import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileViewNavbarComponent } from './mobile-view-navbar.component';

describe('MobileViewNavbarComponent', () => {
  let component: MobileViewNavbarComponent;
  let fixture: ComponentFixture<MobileViewNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileViewNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileViewNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
