import { Component, OnInit, Input } from '@angular/core';
import { Store } from '../../store/store';
import { Configs } from '../../models/Configs.model';
import { AngularFixHeaderGridService } from '../../angular-fix-header-grid.service';

@Component({
  selector: 'db-grid-pagination',
  templateUrl: './grid-pagination.component.html',
  styleUrls: ['./grid-pagination.component.scss']
})
export class GridPaginationComponent implements OnInit {
  @Input()
  store: Store;

  @Input()
  configs: Configs;

  items:number[] = [];
  selections:boolean[] = [];

  constructor(private angularFixHeaderGridService: AngularFixHeaderGridService) { }

  ngOnInit() {
    this.calculatePage();
    this.angularFixHeaderGridService.display_data_observable$.subscribe((store) => {
      this.calculatePage();
    });
  }

  calculatePage() {
    this.items = [];
    const display_data = this.store.getDisplayData();
    const total = Math.ceil(display_data.length / this.configs.per_page);

    for (let index = 0; index < total; index++) {
      this.items.push(index + 1);
      this.selections.push(false);
    }
    this.selections[0] = true;
  }

  showPage(page_number) {
    this.angularFixHeaderGridService.pagination_observable.next(page_number);
    for (let index = 0; index < this.selections.length; index++) {
      this.selections[index] = false;
    }
    this.selections[page_number] = true;
  }

}
