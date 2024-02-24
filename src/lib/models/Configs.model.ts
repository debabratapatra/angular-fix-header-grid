import { CssClass } from "./CssClass.model";
import { Column } from "./Column.model";
import { Actions } from "./Actions.model";

export interface Configs {
  css?: CssClass;
  columns?: Column[];
  data_loading_text?: string;
  multi_select_width?: string;
  action_column_width?: string;
  height?: string;
  actions?: Actions;
  filter?: boolean;
  pagination?: boolean;
  per_page?: number;
  multi_select?: boolean;
  show_summary_row?: boolean;
  row_class_function?: Function;
  row_edit_function?: Function;
  row_delete_function?: Function;
  row_select_function?: Function;
}
