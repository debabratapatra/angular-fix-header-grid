import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridPaginationComponent } from './grid-pagination.component';

@NgModule({
  declarations: [GridPaginationComponent],
  imports: [
    CommonModule
  ],
  exports: [GridPaginationComponent]
})
export class GridPaginationModule { }
