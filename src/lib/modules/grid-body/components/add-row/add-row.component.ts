import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store } from "../../../../store/store";
import { Column } from "../../../../models/Column.model";
import { Configs } from "../../../../models/Configs.model";

@Component({
  selector: "[db-add-row]",
  templateUrl: "./add-row.component.html",
  styleUrls: ["./add-row.component.scss"],
})
export class AddRowComponent implements OnInit {
  raw_data: any[] = [];
  row_data: any = {};
  parents: any[] = [];
  show_add_row: boolean = false;

  @Input()
  store!: Store;

  @Input()
  columns!: Column[];

  @Input()
  configs!: Configs;

  @Input()
  internal_configs: any;

  @Output() rowadd: EventEmitter<any> = new EventEmitter();
  @Output() canceledit: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.raw_data = this.store.getRawData();
    this.columns.forEach((column) => {
      this.row_data[column.name!] = "";
    });
  }

  saveAddRecord(e: any) {
    this.store.addRecord(this.row_data);
    this.rowadd.emit(this.row_data);
  }

  cancelAddEdit() {
    this.internal_configs.show_add_row = false;
  }
}
