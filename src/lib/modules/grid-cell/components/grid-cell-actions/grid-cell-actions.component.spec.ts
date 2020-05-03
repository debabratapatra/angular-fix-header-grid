import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCellActionsComponent } from './grid-cell-actions.component';

describe('GridCellActionsComponent', () => {
  let component: GridCellActionsComponent;
  let fixture: ComponentFixture<GridCellActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCellActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCellActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
