import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GridBodyComponent } from "./grid-body.component";
import { AddRowComponent } from "./components/add-row/add-row.component";
import { FilterRowComponent } from "./components/filter-row/filter-row.component";
import { GridCellModule } from "../grid-cell/grid-cell.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [GridBodyComponent, AddRowComponent, FilterRowComponent],
  imports: [CommonModule, GridCellModule, FormsModule],
  exports: [GridBodyComponent],
})
export class GridBodyModule {}
