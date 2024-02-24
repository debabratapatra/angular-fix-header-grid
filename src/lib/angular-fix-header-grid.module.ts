import { NgModule } from "@angular/core";
import { AngularFixHeaderGridComponent } from "./angular-fix-header-grid.component";
import { CommonModule } from "@angular/common";
import { GridBodyModule } from "./modules/grid-body/grid-body.module";
import { GridHeadModule } from "./modules/grid-head/grid-head.module";
import { GridPaginationModule } from "./modules/grid-pagination/grid-pagination.module";

@NgModule({
  declarations: [AngularFixHeaderGridComponent],
  imports: [CommonModule, GridBodyModule, GridHeadModule, GridPaginationModule],
  exports: [AngularFixHeaderGridComponent],
})
export class AngularFixHeaderGridModule {}

export { DefaultEditor } from "./modules/grid-cell/components/grid-cell-editor/default/default-editor.component";
