import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCirclesComponent } from './active-circles.component';

describe('ActiveCirclesComponent', () => {
  let component: ActiveCirclesComponent;
  let fixture: ComponentFixture<ActiveCirclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveCirclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
