import { Component, OnInit, Input } from '@angular/core';
import { Column } from '../../../../../models/Column.model';
import { DefaultEditor } from './default-editor.component';

@Component({
  selector: 'db-grid-cell-editor',
  templateUrl: './grid-cell-editor.component.html',
  styleUrls: ['./grid-cell-editor.component.scss']
})
export class GridCellEditorComponent extends DefaultEditor implements OnInit {
  @Input()
  cell_value: string;

  @Input()
  row_data: any;

  @Input()
  column: Column;

  @Input()
  expandable_column: boolean;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
