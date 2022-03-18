import { TestBed } from '@angular/core/testing';

import { Api2Service } from './api2.service';

describe('ApiService', () => {
  let service: Api2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
