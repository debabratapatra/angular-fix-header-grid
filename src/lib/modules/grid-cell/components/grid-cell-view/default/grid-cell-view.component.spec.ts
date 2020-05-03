import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCellViewComponent } from './grid-cell-view.component';

describe('GridCellViewComponent', () => {
  let component: GridCellViewComponent;
  let fixture: ComponentFixture<GridCellViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCellViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCellViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
