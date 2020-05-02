import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeadComponent } from './grid-head.component';

describe('GridHeadComponent', () => {
  let component: GridHeadComponent;
  let fixture: ComponentFixture<GridHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
