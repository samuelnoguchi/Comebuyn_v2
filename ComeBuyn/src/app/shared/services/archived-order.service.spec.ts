import { TestBed } from '@angular/core/testing';

import { ArchivedOrderService } from './archived-order.service';

describe('ArchivedOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchivedOrderService = TestBed.get(ArchivedOrderService);
    expect(service).toBeTruthy();
  });
});
