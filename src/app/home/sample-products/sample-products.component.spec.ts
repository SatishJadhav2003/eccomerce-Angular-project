import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleProductsComponent } from './sample-products.component';

describe('SampleProductsComponent', () => {
  let component: SampleProductsComponent;
  let fixture: ComponentFixture<SampleProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
