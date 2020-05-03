import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridCellComponent } from './grid-cell.component';
import { GridCellActionsComponent } from './components/grid-cell-actions/grid-cell-actions.component';

@NgModule({
  declarations: [GridCellComponent, GridCellActionsComponent],
  imports: [
    CommonModule
  ]
})
export class GridCellModule { }
