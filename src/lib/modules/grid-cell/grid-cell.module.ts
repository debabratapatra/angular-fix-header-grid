import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridCellComponent } from './grid-cell.component';
import { GridCellActionsComponent } from './components/grid-cell-actions/grid-cell-actions.component';
import { GridCellViewComponent } from './components/grid-cell-view/default/grid-cell-view.component';
import { GridCellEditorComponent } from './components/grid-cell-editor/default/grid-cell-editor.component';
import { FormsModule } from '@angular/forms';
import { CustomCellEditorComponent } from './components/grid-cell-editor/custom/custom-tree-cell-Editor.component';
import { CustomCellViewComponent } from './components/grid-cell-view/custom/custom-tree-cell.component';

@NgModule({
  declarations: [GridCellComponent,
    GridCellActionsComponent,
    GridCellViewComponent,
    GridCellEditorComponent,
    CustomCellViewComponent,
    CustomCellEditorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    GridCellComponent,
    CustomCellViewComponent,
    CustomCellEditorComponent,
    GridCellEditorComponent,
    GridCellActionsComponent
  ]
})
export class GridCellModule { }
