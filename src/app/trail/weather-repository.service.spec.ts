import { TestBed } from '@angular/core/testing';

import { WeatherRepositoryService } from './weather-repository.service';

describe('WeatherRepositoryService', () => {
  let service: WeatherRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
