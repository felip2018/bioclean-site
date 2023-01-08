import { TestBed } from '@angular/core/testing';

import { FragancesService } from './fragances.service';

describe('FragancesService', () => {
  let service: FragancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FragancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
