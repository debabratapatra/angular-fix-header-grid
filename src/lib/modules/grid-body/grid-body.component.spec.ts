import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBodyComponent } from './grid-body.component';

describe('GridBodyComponent', () => {
  let component: GridBodyComponent;
  let fixture: ComponentFixture<GridBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
