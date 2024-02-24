import { Component, OnInit, Input } from "@angular/core";
import { Column } from "../../../../../models/Column.model";

@Component({
  selector: "db-grid-cell-view",
  templateUrl: "./grid-cell-view.component.html",
  styleUrls: ["./grid-cell-view.component.scss"],
})
export class GridCellViewComponent implements OnInit {
  @Input()
  column!: Column;

  @Input()
  row_data: any;

  constructor() {}

  ngOnInit() {}
}
