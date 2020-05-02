import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'db-angular-fix-header-grid',
  templateUrl: 'angular-fix-header-grid.component.html',
  styleUrls: ['./angular-fix-header-grid.component.scss']
})
export class AngularFixHeaderGridComponent implements OnInit, AfterViewInit {

  data: any = [
    { id: 1, name: 'Ashok1', age: 60, parent: 0, weight: 60, gender: 1, phone: 7930343463},
    { id: 2, name: 'Sam', age: 40, parent: 1, weight: 60, gender: 1, phone: 7930343463},
    { id: 3, name: 'Sriya', age: 36, parent: 1, weight: 60, gender: 1, phone: 7930343463},
    { id: 4, name: 'Prakash', age: 20, parent: 2, weight: 60, gender: 1, phone: 7930343463},
    { id: 5, name: 'Sneha', age: 21, parent: 3, weight: 60, gender: 1, phone: 7930343463},
    { id: 6, name: 'Pritam', age: 60, parent: 34, weight: 60, gender: 1, phone: 7930343463},
    { id: 7, name: 'Roshan', age: 40, parent: 6, weight: 60, gender: 1, phone: 7930343463},
    { id: 8, name: 'Suraj', age: 36, parent: 6, weight: 60, gender: 1, phone: 7930343463},
    { id: 9, name: 'Swarup', age: 20, parent: 8, weight: 60, gender: 1, phone: 7930343463},
    { id: 10, name: 'Aditya', age: 21, parent: 8, weight: 60, gender: 1, phone: 7930343463},
  ];
  height = '100px';
  headers = ['Id', 'name', 'age', 'weight', 'gender', 'phone'];
  body = [
    [1, 'Ashok1', 60, 60, 1, 7930343463],
    [1, 'Ashok1', 60, 60, 1, 7930343463],
    [1, 'Ashok1', 60, 60, 1, 7930343463],
    [1, 'Ashok1zxczxc', 60, 60, 1, 7930343463],
    [1, 'Ashok1', 60, 60, 1, 7930343463],
    [1, 'Ashok1', 60, 60, 1, 7930343463],
    [1, 'Ashok1', 60, 60, 1, 7930343463]
  ];

  widths = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const interval = setInterval(() => {
      const ths: any = document.querySelectorAll('thead > tr th');
      const tds: any = document.querySelectorAll('tbody tr td');

      if (ths[0].clientWidth !== undefined) {
        console.log(ths[0].clientWidth);

        for (let index = 0; index < ths.length; index++) {
          const th = ths[index];
          const td = tds[index];
          if (th.clientWidth > td.clientWidth) {
            this.widths[index] = th.clientWidth;
          } else {
            this.widths[index] = td.clientWidth;
          }
        }
        clearInterval(interval);
      }
    }, 300);
  }

}
