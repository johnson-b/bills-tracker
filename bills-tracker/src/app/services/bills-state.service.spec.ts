import { TestBed } from '@angular/core/testing';

import { BillsStateService } from './bills-state.service';

describe('BillsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillsStateService = TestBed.get(BillsStateService);
    expect(service).toBeTruthy();
  });
});
