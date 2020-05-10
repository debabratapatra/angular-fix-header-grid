import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Store } from './store/store';
import { AngularFixHeaderGridService } from './angular-fix-header-grid.service';
import { Column } from './models/Column.model';
import { Configs } from './models/Configs.model';

@Component({
  selector: 'db-angular-fix-header-grid',
  templateUrl: 'angular-fix-header-grid.component.html',
  styleUrls: ['./angular-fix-header-grid.component.scss']
})
export class AngularFixHeaderGridComponent implements OnInit, AfterViewInit, OnChanges {

  processed_data: any[] = [];
  columns: Column[] = [];
  edit_tracker: any = {}; // Track Edit options.
  internal_configs: any = {
    show_add_row: false,
    all_selected: false
  };
  store = new Store(this.angularFixHeaderGridService);

  @Input()
  data: any[] = [];

  @Input()
  configs: Configs;

  default_configs: Configs = {
    css: {
      expand_class: 'plus',
      collapse_class: 'minus',
      add_class: 'plus',
      edit_class: '',
      delete_class: '',
      save_class: '',
      cancel_class: '',
      row_selection_class: 'selected',
      header_class: '',
      row_filter_class: '',
      table_class: ''
    },
    actions: {
      edit: false,
      add: false,
      delete: false,
      resolve_edit: false,
      resolve_add: false,
      resolve_delete: false
    },
    data_loading_text: 'Loading...',
    filter: false,
    multi_select: false,
    show_summary_row: false,
    multi_select_width: 'auto',
    action_column_width: '60px',
    row_class_function: () => true,
    row_edit_function: () => true,
    row_delete_function: () => true
  };
  default_column_config: Column = {
    sorted: 0,
    sort_type: null,
    editable: false,
    hidden: false,
    filter: true,
    case_sensitive_filter: false
  };

   @Output() cellclick: EventEmitter<any> = new EventEmitter();
   @Output() rowselect: EventEmitter<any> = new EventEmitter();
   @Output() rowdeselect: EventEmitter<any> = new EventEmitter();
   @Output() rowselectall: EventEmitter<any> = new EventEmitter();
   @Output() rowdeselectall: EventEmitter<any> = new EventEmitter();
   @Output() rowadd: EventEmitter<any> = new EventEmitter();
   @Output() rowsave: EventEmitter<any> = new EventEmitter();
   @Output() rowdelete: EventEmitter<any> = new EventEmitter();

  constructor(private angularFixHeaderGridService: AngularFixHeaderGridService) { }

  ngOnInit() {
    this.validateConfigs();
    this.setDefaultConfigs();
    this.setColumnNames();
  }

  ngAfterViewInit() {
    const interval = setInterval(() => {
      const ths: any = document.querySelectorAll('table.db-grid-header-view thead > tr th');
      const tds: any = document.querySelectorAll('table.db-grid-body-view tbody tr td');

      if (ths[0] && tds[0] && ths[0].clientWidth !== undefined) {
        let totalWidth = 0;
        let column_index = 0;
        let hasActionSet = false;

        for (let index = 0; index < ths.length; index++) {
          const th = ths[index];
          const td = tds[index];
          let cellWidth = 0;
          if (th.clientWidth > td.clientWidth) {
            cellWidth = th.clientWidth + 1;
          } else {
            cellWidth = td.clientWidth + 1;
          }
          if (this.configs.multi_select && index === 0) {
            column_index = 1;
            this.configs.multi_select_width = cellWidth + 'px';
          } else if ((this.configs.actions.edit || this.configs.actions.delete || this.configs.actions.add)
            && (index === 1 || index === 0) && !hasActionSet) {
            column_index = index === 0 ? 1 : 2;
            this.configs.action_column_width = cellWidth + 'px';
            hasActionSet = true;
          } else {
            this.columns[index - column_index].width = cellWidth + 'px';
          }
          // td.style.width = cellWidth + 'px';
          // th.style.width = cellWidth + 'px';

          totalWidth += cellWidth;
        }

        // Expand container
        (<any>document.querySelector('div.fix-table-container')).style.width = totalWidth + 20 + 'px';
        clearInterval(interval);
      }
    }, 300);
  }

  ngOnChanges() {
    this.validateConfigs();
    this.setDefaultConfigs();
    this.setColumnNames();
    this.store.processData(
      this.data,
      this.configs,
      this.edit_tracker,
      this.internal_configs
    );
  }

  validateConfigs() {
    if (!this.data) {
      window.console.warn('data can\'t be empty!');
      return;
    }
    if (!this.configs) {
      window.console.warn('configs can\'t be empty!');
      return;
    }
  }

  setDefaultConfigs() {
    this.processed_data = [];
    this.configs = Object.assign({}, this.default_configs, this.configs);

    // Deep clone.
    this.configs.actions = Object.assign({}, this.default_configs.actions, this.configs.actions);
    this.configs.css = Object.assign({}, this.default_configs.css, this.configs.css);
  }

  setColumnNames() {
    this.columns = this.configs.columns ? this.configs.columns : [];

    // If columns doesn't exist in user's object.
    if (!this.configs.columns && this.data[0]) {
      const column_keys = Object.keys(this.data[0]);

      // Insert Header and default configuration.
      column_keys.forEach(key => {
        this.columns.push(Object.assign({'header': key, 'name': key}, this.default_column_config));
      });
    } else {

      // Insert Header and default configuration.
      for (let i = 0; i < this.columns.length; i++) {
        this.columns[i] = Object.assign({}, this.default_column_config, this.columns[i]);
      }
    }
  }

  selectAll() {
    this.angularFixHeaderGridService.selectAll(this.store.getDisplayData());
    this.internal_configs.all_selected = true;
  }

  deSelectAll() {
    this.angularFixHeaderGridService.deSelectAll(this.store.getDisplayData());
    this.internal_configs.all_selected = false;
  }

}
