import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeigthComponent } from './weigth.component';

describe('WeigthComponent', () => {
  let component: WeigthComponent;
  let fixture: ComponentFixture<WeigthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeigthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeigthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
