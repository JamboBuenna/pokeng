import {Injectable} from '@angular/core';
import {PokemonApiService} from "./pokemon-api.service";
import {ErrorHandlingService} from "./error-handling.service";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";

@Injectable()
export class WeaknessesService {

  constructor(private papiService: PokemonApiService,
              private errorHandlingService: ErrorHandlingService) {
  }

  /**
   * This caches the arrays of weaknesses for each type of pokemon, reducing the need for requests to the api.
   * @type {{}}
   */
  cachedWeaknesses = {};

  /**
   * This creates multiple observables which get an array of the weaknesses relevent to a type.
   * This is then merged into one observable which can be easily handled by the user of the service.
   * TODO - Maybe this should be the only public method in this service...
   * @param pokemonDetails
   * @returns {Observable<any>}
   */
  getWeaknessFromPokemonDetails(pokemonDetails: any): Observable<any> {
    let observableArray = [];
    let typesArray = pokemonDetails['types'],
      i;

    for (i = 0; i < typesArray.length; i++) {
      observableArray.push(this.getWeaknessesForType(typesArray[i].type));
    }

    let observable = Observable.merge(...observableArray);
    return observable;
  }

  /**
   * This gets an array of pokemon weaknesses as an observable, either as by creating a cached
   * weakness or via a rest request.
   * @param type
   * @returns {Observable<string[]>}
   */
  getWeaknessesForType(type: any): Observable<string[]> {
    //If we've already got the types cached... we can just do a quick lookup!
    if (this.cachedWeaknesses[type.name] !== undefined) {
      return Observable.of(this.cachedWeaknesses[type.name]);
    } else {
      return this.requestWeaknessForType(type);
    }
  }

  /**
   * If we have not already cached pokemon weakness for this type we call this function.
   * This gets the array of pokemon weaknesses, which it returns as an array of strings in an Observable.
   * It also adds the array of pokemon weaknesses to the cachedSet.
   * @param type
   * @returns {Observable<string[]>}
   */
  requestWeaknessForType(type: any): Observable<string[]> {
    let url = type.url;

    return this.papiService.retrieveTypeFromUrl(url).map(pokemonTypeDetails => {
      let weaknessesArray = [];

      if (pokemonTypeDetails) {
        //I'd discuss with end-user if the other status cases count as a weakness.
        let i,
          doubleDamageFrom = pokemonTypeDetails['damage_relations'].double_damage_from;

        for (i = 0; i < doubleDamageFrom.length; i++) {
          weaknessesArray.push(doubleDamageFrom[i].name);
        }

        //Update the cachedWeaknesses, if it's not been updated already...
        if (this.cachedWeaknesses[type.name] === undefined) {
          this.cachedWeaknesses[type.name] = weaknessesArray;
        }
        return weaknessesArray;
      }
    });
  }
}
