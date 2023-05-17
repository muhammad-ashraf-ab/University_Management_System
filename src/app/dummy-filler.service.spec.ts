import { TestBed } from '@angular/core/testing';

import { DummyFillerService } from './dummy-filler.service';

describe('DummyFillerService', () => {
  let service: DummyFillerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyFillerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
