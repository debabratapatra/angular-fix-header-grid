import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridHeadComponent } from './grid-head.component';

@NgModule({
  declarations: [GridHeadComponent],
  imports: [
    CommonModule
  ],
  exports: [GridHeadComponent]
})
export class GridHeadModule { }
