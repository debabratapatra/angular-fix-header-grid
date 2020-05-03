import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Store } from '../../store/store';
import { Configs } from '../../models/Configs.model';
import { Column } from '../../models/Column.model';
import { AngularFixHeaderGridService } from '../../angular-fix-header-grid.service';

@Component({
  selector: '[db-grid-body]',
  templateUrl: './grid-body.component.html',
  styleUrls: ['./grid-body.component.scss']
})
export class GridBodyComponent implements OnInit {
  raw_data: any[];
  display_data: any[];

  @Input()
  store: Store;

  @Input()
  configs: Configs;

  @Input()
  expand_tracker: any;

  @Input()
  edit_tracker: any;

  @Input()
  internal_configs: any;

  @Input()
  columns: Column[];

  @Input()
  cellclick: EventEmitter<any>;

  @Input()
  rowdelete: EventEmitter<any>;

  @Input()
  rowsave: EventEmitter<any>;

  @Input()
  rowadd: EventEmitter<any>;

  @Input()
  rowselect: EventEmitter<any>;

  @Input()
  rowdeselect: EventEmitter<any>;

  constructor(private angularFixHeaderGridService: AngularFixHeaderGridService) {
  }

  ngOnInit() {
    this.display_data = this.store.getDisplayData();
    this.angularFixHeaderGridService.display_data_observable$.subscribe((store) => {
      this.display_data = this.store.getDisplayData();
    });

  }

  refreshData(element) {
    this.expand_tracker = {};
    this.edit_tracker = {};
    this.store.processData(
      this.store.getRawData(),
      this.configs,
      this.edit_tracker,
      this.internal_configs
    );
  }

  saveRecord($event) {
    const element = $event.data;

    if (this.configs.actions.resolve_edit) {
      const promise = new Promise((resolve, reject) => {
        this.rowsave.emit({
          data: element,
          resolve: resolve
        });
      });

      promise.then(() => {
        this.checkAndRefreshData(element);
      }).catch((err) => {});
    } else {
      this.checkAndRefreshData(element);
      this.rowsave.emit(element);
    }
  }

  checkAndRefreshData(element) {

  }

  addRow(element) {
    if (this.configs.actions.resolve_add) {
      const promise = new Promise((resolve, reject) => {
        this.rowadd.emit({
          data: element,
          resolve: resolve
        });
      });

      promise.then(() => {
        this.internal_configs.show_add_row = false;
        this.refreshData(element);
      }).catch((err) => {});
    } else {
      this.refreshData(element);
      this.internal_configs.show_add_row = false;
      this.rowadd.emit(element);
    }
  }

  cancelEdit(row_data) {
    // const index = row_data[this.configs.id_field];

    // // Cancel all changes ie copy from back up.
    // Object.assign(row_data, this.internal_configs.current_edited_row);

    // this.edit_tracker[index] = false;
    // this.internal_configs.show_parent_col = false;
  }

  selectRow(row_data, event) {

    // Don't run if Multi select is enabled.
    if (this.configs.multi_select) {
      return;
    }

    this.store.getDisplayData().forEach(data => {
      data.row_selected = false;
    });
    row_data.row_selected = true;
    this.rowselect.emit({data: row_data, event: event});
  }

  selectRowOnCheck(row_data, event) {
    if (event.target.checked) {
      row_data.row_selected = true;
      this.rowselect.emit({data: row_data, event: event});
    } else {
      row_data.row_selected = false;
      this.rowdeselect.emit({data: row_data, event: event});
    }

    this.setSelectAllConfig();
  }

  /**
   * Set Select All config on Select change.
   *
   */
  setSelectAllConfig() {
    let select_all = true;

    this.store.getDisplayData().forEach(data => {
      if (!data.row_selected) {
        select_all = false;
      }
    });

    this.internal_configs.all_selected = select_all;

  }

}
