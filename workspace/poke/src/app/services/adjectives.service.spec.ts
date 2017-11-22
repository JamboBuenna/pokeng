import {TestBed, inject} from '@angular/core/testing';

import {AdjectivesService} from './adjectives.service';

describe('AdjectivesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdjectivesService]
    });
  });

  it('should be created', inject([AdjectivesService], (service: AdjectivesService) => {
    expect(service).toBeTruthy();
  }));

  describe('adjective from letter function', () => {
    it('should return a word that start with the letter passed in', inject([AdjectivesService], (service: AdjectivesService) => {
      expect(service.getAdjectiveStartingWithLetter('a').subscribe(result => expect(
        result.charAt(0) === 'a')));
    }));
  })


});
