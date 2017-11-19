import {Injectable} from '@angular/core';
import {PokemonApiService} from "./pokemon-api.service";
import {ErrorHandlingService} from "./error-handling.service";
import {ResultsComponent} from "../results/results.component";

@Injectable()
export class WeaknessesService {

  constructor(private papiService: PokemonApiService,
              private errorHandlingService: ErrorHandlingService) {
  }


  cachedWeaknesses = {};

  getWeaknessesForType(type: any, addToWeaknessCallback, scope: ResultsComponent) {
    //If we've already got the types cached... we can just do a quick lookup!
    if (this.cachedWeaknesses[type.name] !== undefined) {
      addToWeaknessCallback(this.cachedWeaknesses[type.name]).bind(scope)
    } else {
      return this.requestWeaknessForType(type, addToWeaknessCallback, scope)
    }
  }

  requestWeaknessForType(type: any, addToWeaknessCallback, scope: ResultsComponent) {
    let url = type.url,
      weaknessesArray = [];

    this.papiService.retrieveTypeFromUrl(url).subscribe(pokemonTypeDetails => {
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
        addToWeaknessCallback(weaknessesArray).bind(scope);
      }
    }, err => {
      this.errorHandlingService.handleError(err);
    });
  }
}
