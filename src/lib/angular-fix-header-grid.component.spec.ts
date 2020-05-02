import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFixHeaderGridComponent } from './angular-fix-header-grid.component';

describe('AngularFixHeaderGridComponent', () => {
  let component: AngularFixHeaderGridComponent;
  let fixture: ComponentFixture<AngularFixHeaderGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularFixHeaderGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFixHeaderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
