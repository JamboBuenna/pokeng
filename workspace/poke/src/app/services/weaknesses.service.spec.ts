import {TestBed, inject} from '@angular/core/testing';

import {WeaknessesService} from './weaknesses.service';

describe('WeaknessesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeaknessesService]
    });
  });

  it('should be created', inject([WeaknessesService], (service: WeaknessesService) => {
    expect(service).toBeTruthy();
  }));
});
