import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Store } from "../../../../store/store";
import { Configs } from "../../../../models/Configs.model";

@Component({
  selector: "[db-grid-cell-actions]",
  templateUrl: "./grid-cell-actions.component.html",
  styleUrls: ["./grid-cell-actions.component.scss"],
})
export class GridCellActionsComponent implements OnInit {
  display_data: any;

  @Input()
  store!: Store;

  @Input()
  edit_tracker: any;

  @Input()
  internal_configs: any;

  @Input()
  configs!: Configs;

  @Input()
  rowdelete!: EventEmitter<any>;

  @Input()
  row_data: any;

  @Output() editcomplete: EventEmitter<any> = new EventEmitter();
  @Output() canceledit: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.display_data = this.store.getDisplayData();
  }

  enableEdit(index: any) {
    this.edit_tracker[index] = true;
    this.internal_configs.current_edited_row = { ...this.row_data };
  }

  findRecordIndex(idx: number) {
    for (const index in this.store.processed_data) {
      if (this.store.processed_data[index].idx === idx) {
        return Number(index);
      }
    }
    return -1;
  }

  deleteRecord(rec: any) {
    const index: number = this.findRecordIndex(rec.idx)!;
    if (this.configs?.actions?.resolve_delete) {
      const promise = new Promise((resolve, reject) => {
        this.rowdelete.emit({
          data: rec,
          resolve: resolve,
        });
      });

      promise
        .then(() => {
          this.store.processed_data.splice(index, 1);
          this.store.refreshDisplayData();
        })
        .catch((err) => {});
    } else {
      this.store.processed_data.splice(index, 1);
      this.store.refreshDisplayData();
      this.rowdelete.emit(rec);
    }
  }

  saveRecord($event: any) {
    this.editcomplete.emit({ event: $event, data: this.row_data });
  }
}
