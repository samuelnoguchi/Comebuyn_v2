import { TestBed } from '@angular/core/testing';

import { CheckOutService } from './check-out.service';

describe('OrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckOutService = TestBed.get(CheckOutService);
    expect(service).toBeTruthy();
  });
});
