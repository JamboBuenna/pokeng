import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  /**
   * Gets a random integer between the minimum and maximum values specified.
   * TODO - Write a test or two to confirm this works as expected.
   * @param min
   * @param max
   * @returns {any}
   */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
