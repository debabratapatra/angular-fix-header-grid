import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Configs } from "../../models/Configs.model";
import { Column } from "../../models/Column.model";

@Component({
  selector: "db-grid-cell",
  templateUrl: "./grid-cell.component.html",
  styleUrls: ["./grid-cell.component.scss"],
})
export class GridCellComponent implements OnInit {
  cell_value: string = "";

  @Input()
  configs!: Configs;

  @Input()
  index!: number;

  @Input()
  row_data: any;

  @Input()
  column!: Column;

  @Input()
  expand_tracker: any;

  @Input()
  cellclick!: EventEmitter<any>;

  @Input()
  edit_on!: boolean;

  @Output() rowexpand: EventEmitter<any> = new EventEmitter();
  @Output() rowcollapse: EventEmitter<any> = new EventEmitter();
  @Output() canceledit: EventEmitter<any> = new EventEmitter();
  @Output() editcomplete: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.cell_value = this.row_data[this.column.name!];
  }

  onCellClick(event: any) {
    this.cellclick.emit({
      column: this.column,
      row: this.row_data,
      event: event,
    });
  }

  onEditComplete($event: any) {
    this.editcomplete.emit({ event: $event, data: this.row_data });
  }
}
