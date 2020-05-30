import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPaginationComponent } from './grid-pagination.component';

describe('GridPaginationComponent', () => {
  let component: GridPaginationComponent;
  let fixture: ComponentFixture<GridPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
