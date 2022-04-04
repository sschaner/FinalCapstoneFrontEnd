import { TestBed } from '@angular/core/testing';

import { TrailRepositoryService } from './trail-repository.service';

describe('TrailRepositoryService', () => {
  let service: TrailRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
