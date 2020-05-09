import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Store } from '../../store/store';
import { Configs } from '../../models/Configs.model';
import { Column } from '../../models/Column.model';
import { AngularFixHeaderGridService } from '../../angular-fix-header-grid.service';

@Component({
  selector: '[db-grid-head]',
  templateUrl: './grid-head.component.html',
  styleUrls: ['./grid-head.component.scss']
})
export class GridHeadComponent implements OnInit {
  @Input()
  store: Store;

  @Input()
  configs: Configs;

  @Input()
  edit_tracker: any;

  @Input()
  internal_configs: any;

  @Input()
  columns: Column[];

  @Input()
  rowselectall: EventEmitter<any>;

  @Input()
  rowdeselectall: EventEmitter<any>;

  constructor(private angularFixHeaderGridService: AngularFixHeaderGridService) { }

  ngOnInit() {
  }

  addRow() {
    this.internal_configs.show_add_row = true;
  }

  selectAll(e) {
    if (e.target.checked) {
      this.angularFixHeaderGridService.selectAll(this.store.getDisplayData());
      this.rowselectall.emit(this.store.getDisplayData());
    } else {
      this.angularFixHeaderGridService.deSelectAll(this.store.getDisplayData());
      this.rowdeselectall.emit(e);
    }
  }

}
