import { TestBed } from '@angular/core/testing';

import { AngularFixHeaderGridService } from './angular-fix-header-grid.service';

describe('AngularFixHeaderGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularFixHeaderGridService = TestBed.get(AngularFixHeaderGridService);
    expect(service).toBeTruthy();
  });
});
