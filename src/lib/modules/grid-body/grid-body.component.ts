import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Store } from "../../store/store";
import { Configs } from "../../models/Configs.model";
import { Column } from "../../models/Column.model";
import { AngularFixHeaderGridService } from "../../angular-fix-header-grid.service";

@Component({
  selector: "[db-grid-body]",
  templateUrl: "./grid-body.component.html",
  styleUrls: ["./grid-body.component.scss"],
})
export class GridBodyComponent implements OnInit {
  raw_data: any[] = [];
  display_data: any[] = [];
  grid_data: any[] = [];

  @Input()
  store!: Store;

  @Input()
  configs!: Configs;

  @Input()
  expand_tracker: any;

  @Input()
  edit_tracker: any;

  @Input()
  internal_configs: any;

  @Input()
  columns!: Column[];

  @Input()
  cellclick!: EventEmitter<any>;

  @Input()
  rowdelete!: EventEmitter<any>;

  @Input()
  rowsave!: EventEmitter<any>;

  @Input()
  rowadd!: EventEmitter<any>;

  @Input()
  rowselect!: EventEmitter<any>;

  @Input()
  rowdeselect!: EventEmitter<any>;

  constructor(
    private angularFixHeaderGridService: AngularFixHeaderGridService
  ) {}

  ngOnInit() {
    this.display_data = this.store.getDisplayData();
    this.setupPagination();

    this.angularFixHeaderGridService.display_data_observable$.subscribe(
      (store) => {
        this.display_data = this.store.getDisplayData();
        this.setupPagination();
      }
    );
  }

  setupPagination() {
    if (this.configs.pagination) {
      this.grid_data = this.display_data.slice(0, this.configs.per_page);

      this.angularFixHeaderGridService.pagination_observable$.subscribe(
        (page_number) => {
          const start = page_number * this.configs.per_page!;
          const end = start + this.configs.per_page!;
          this.grid_data = this.display_data.slice(start, end);
        }
      );
    } else {
      this.grid_data = this.display_data;
    }
  }

  saveRecord($event: any) {
    const element = $event.data;

    if (this.configs?.actions?.resolve_edit) {
      const promise = new Promise((resolve, reject) => {
        this.rowsave.emit({
          data: element,
          resolve: resolve,
        });
      });

      promise
        .then(() => {
          this.checkAndRefreshData(element);
        })
        .catch((err) => {});
    } else {
      this.checkAndRefreshData(element);
      this.rowsave.emit(element);
    }
  }

  checkAndRefreshData(element: any) {
    this.edit_tracker[element.idx] = false;
  }

  addRow(element: any) {
    if (this.configs.actions?.resolve_add) {
      const promise = new Promise((resolve, reject) => {
        this.rowadd.emit({
          data: element,
          resolve: resolve,
        });
      });

      promise
        .then(() => {
          this.internal_configs.show_add_row = false;
        })
        .catch((err) => {});
    } else {
      this.internal_configs.show_add_row = false;
      this.rowadd.emit(element);
    }
  }

  cancelEdit(row_data: any) {
    const index = row_data.idx;

    // Cancel all changes ie copy from back up.
    Object.assign(row_data, this.internal_configs.current_edited_row);

    this.edit_tracker[index] = false;
  }

  selectRow(row_data: any, event: any) {
    // Don't run if Multi select is enabled.
    if (this.configs.multi_select) {
      return;
    }

    this.store.getDisplayData().forEach((data) => {
      data.row_selected = false;
    });
    row_data.row_selected = true;
    this.rowselect.emit({ data: row_data, event: event });
  }

  selectRowOnCheck(row_data: any, event: any) {
    if (event.target.checked) {
      row_data.row_selected = true;
      this.rowselect.emit({ data: row_data, event: event });
    } else {
      row_data.row_selected = false;
      this.rowdeselect.emit({ data: row_data, event: event });
    }

    this.setSelectAllConfig();
  }

  /**
   * Set Select All config on Select change.
   *
   */
  setSelectAllConfig() {
    let select_all = true;

    this.store.getDisplayData().forEach((data) => {
      if (!data.row_selected) {
        select_all = false;
      }
    });

    this.internal_configs.all_selected = select_all;
  }

  showSelectBox(row_data: any) {
    if (this.configs.row_select_function) {
      return this.configs.row_select_function(row_data);
    } else {
      return true;
    }
  }
}
