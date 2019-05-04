import { TestBed } from '@angular/core/testing';

import { BillsApiService } from './bills-api.service';

describe('BillsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillsApiService = TestBed.get(BillsApiService);
    expect(service).toBeTruthy();
  });
});
