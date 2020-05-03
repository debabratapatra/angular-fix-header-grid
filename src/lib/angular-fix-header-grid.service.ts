import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularFixHeaderGridService {
  private display_data_observable = new Subject<any[]>();
  display_data_observable$ = this.display_data_observable.asObservable();

  constructor() { }

  updateDisplayDataObservable(display_data: any[]) {
    this.display_data_observable.next(display_data);
  }

  findRowIndex(display_data, configs, row_id) {
    return display_data.map(row => row[configs.id_field]).
                    indexOf(row_id);
  }

  selectAll(display_data) {
    display_data.forEach(data => {
        data.row_selected = true;
    });
  }

  deSelectAll(display_data) {
    display_data.forEach(data => {
        data.row_selected = false;
    });
  }
}
