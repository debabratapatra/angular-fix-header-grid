import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridBodyComponent } from './grid-body.component';
import { AddRowComponent } from './components/add-row/add-row.component';
import { FilterRowComponent } from './components/filter-row/filter-row.component';

@NgModule({
  declarations: [GridBodyComponent, AddRowComponent, FilterRowComponent],
  imports: [
    CommonModule
  ]
})
export class GridBodyModule { }
