import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { Store } from "./store/store";
import { AngularFixHeaderGridService } from "./angular-fix-header-grid.service";
import { Column } from "./models/Column.model";
import { Configs } from "./models/Configs.model";

@Component({
  selector: "db-angular-fix-header-grid",
  templateUrl: "angular-fix-header-grid.component.html",
  styleUrls: ["./angular-fix-header-grid.component.scss"],
})
export class AngularFixHeaderGridComponent
  implements OnInit, AfterViewInit, OnChanges
{
  processed_data: any[] = [];
  columns: Column[] = [];
  edit_tracker: any = {}; // Track Edit options.
  internal_configs: any = {
    show_add_row: false,
    all_selected: false,
  };
  angularFixedHeaderGridService: AngularFixHeaderGridService;
  store: Store;

  @Input()
  source: any[] = [];

  @Input()
  configs!: Configs;

  default_configs: Configs = {
    css: {
      expand_class: "plus",
      collapse_class: "minus",
      add_class: "plus",
      edit_class: "",
      delete_class: "",
      save_class: "",
      cancel_class: "",
      row_selection_class: "selected",
      header_class: "",
      row_filter_class: "",
      table_class: "",
    },
    actions: {
      edit: false,
      add: false,
      delete: false,
      resolve_edit: false,
      resolve_add: false,
      resolve_delete: false,
    },
    data_loading_text: "Loading...",
    filter: false,
    multi_select: false,
    show_summary_row: false,
    pagination: false,
    per_page: 10,
    multi_select_width: "auto",
    action_column_width: "60px",
    row_class_function: () => true,
    row_edit_function: () => true,
    row_delete_function: () => true,
    row_select_function: () => true,
  };
  default_column_config: Column = {
    name: "",
    sorted: 0,
    sort_type: undefined,
    editable: false,
    hidden: false,
    filter: true,
    case_sensitive_filter: false,
  };

  @Output() cellclick: EventEmitter<any> = new EventEmitter();
  @Output() rowselect: EventEmitter<any> = new EventEmitter();
  @Output() rowdeselect: EventEmitter<any> = new EventEmitter();
  @Output() rowselectall: EventEmitter<any> = new EventEmitter();
  @Output() rowdeselectall: EventEmitter<any> = new EventEmitter();
  @Output() rowadd: EventEmitter<any> = new EventEmitter();
  @Output() rowsave: EventEmitter<any> = new EventEmitter();
  @Output() rowdelete: EventEmitter<any> = new EventEmitter();

  constructor(
    private angularFixHeaderGridService: AngularFixHeaderGridService
  ) {
    this.angularFixedHeaderGridService = angularFixHeaderGridService;
    this.store = new Store(this.angularFixHeaderGridService);
  }

  ngOnInit() {
    this.validateConfigs();
    this.setDefaultConfigs();
    this.setColumnNames();
  }

  ngAfterViewInit() {}

  ngOnChanges() {
    this.validateConfigs();
    this.setDefaultConfigs();
    this.setColumnNames();
    this.store.processData(this.source, this.configs, this.edit_tracker);
    this.setColumnWidth();
  }

  setColumnWidth() {
    const interval = setInterval(() => {
      const ths: any = document.querySelectorAll(
        "table.db-grid-header-view thead > tr th"
      );
      const tds: any = document.querySelectorAll(
        "table.db-grid-body-view tbody tr td"
      );

      if (ths[0] && tds[0] && ths[0].clientWidth !== undefined) {
        let totalWidth = 0;
        let column_index = 0;
        let hasActionSet = false;
        const offset = 5;

        for (let index = 0; index < ths.length; index++) {
          const th = ths[index];
          const td = tds[index];
          let cellWidth = 0;
          if (th.clientWidth > td.clientWidth) {
            cellWidth = th.clientWidth + offset;
          } else {
            cellWidth = td.clientWidth + offset;
          }
          if (this.configs.multi_select && index === 0) {
            column_index = 1;
            this.configs.multi_select_width = cellWidth + "px";
          } else if (
            (this.configs?.actions?.edit ||
              this.configs?.actions?.delete ||
              this.configs?.actions?.add) &&
            (index === 1 || index === 0) &&
            !hasActionSet
          ) {
            column_index = index === 0 ? 1 : 2;
            this.configs.action_column_width = cellWidth + "px";
            hasActionSet = true;
          } else {
            this.columns[index - column_index].width = cellWidth + "px";
          }
          // td.style.width = cellWidth + 'px';
          // th.style.width = cellWidth + 'px';

          totalWidth += cellWidth;
        }

        // Expand container
        (<any>document.querySelector("div.fix-table-container")).style.width =
          totalWidth + 20 + "px";
        clearInterval(interval);
      }
    }, 500);
  }

  validateConfigs() {
    if (!this.source) {
      window.console.warn("source can't be empty!");
      return;
    }
    if (!this.configs) {
      window.console.warn("configs can't be empty!");
      return;
    }
  }

  setDefaultConfigs() {
    this.processed_data = [];
    this.configs = Object.assign({}, this.default_configs, this.configs);

    // Deep clone.
    this.configs.actions = Object.assign(
      {},
      this.default_configs.actions,
      this.configs.actions
    );
    this.configs.css = Object.assign(
      {},
      this.default_configs.css,
      this.configs.css
    );
  }

  setColumnNames() {
    this.columns = this.configs.columns ? this.configs.columns : [];

    // If columns doesn't exist in user's object.
    if (!this.configs.columns && this.source[0]) {
      const column_keys = Object.keys(this.source[0]);

      // Insert Header and default configuration.
      column_keys.forEach((key) => {
        this.columns.push(
          Object.assign({ header: key, name: key }, this.default_column_config)
        );
      });
    } else {
      // Insert Header and default configuration.
      for (let i = 0; i < this.columns.length; i++) {
        this.columns[i] = Object.assign(
          {},
          this.default_column_config,
          this.columns[i]
        );
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
