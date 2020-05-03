import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridCellComponent } from './grid-cell.component';
import { GridCellActionsComponent } from './components/grid-cell-actions/grid-cell-actions.component';
import { GridCellViewComponent } from './components/grid-cell-view/default/grid-cell-view.component';
import { GridCellEditorComponent } from './components/grid-cell-editor/default/grid-cell-editor.component';

@NgModule({
  declarations: [GridCellComponent, GridCellActionsComponent, GridCellViewComponent, GridCellEditorComponent],
  imports: [
    CommonModule
  ]
})
export class GridCellModule { }
