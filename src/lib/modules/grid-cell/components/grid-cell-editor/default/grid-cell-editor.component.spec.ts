import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCellEditorComponent } from './grid-cell-editor.component';

describe('GridCellEditorComponent', () => {
  let component: GridCellEditorComponent;
  let fixture: ComponentFixture<GridCellEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCellEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
