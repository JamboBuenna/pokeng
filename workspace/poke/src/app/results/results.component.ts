import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonApiService} from "../services/pokemon-api.service";
import {ErrorHandlingService} from "../services/error-handling.service";
import {WeaknessesService} from "../services/weaknesses.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private papiService: PokemonApiService,
              private weaknessService: WeaknessesService,
              private errorHandlingService: ErrorHandlingService) {
  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] !== undefined) {
      this.pokemon.id = this.route.snapshot.params['id'];
      this.updatePokemon()
    }
  }

  loading = true;

  /**
   * Arrar if all the unique weaknesses a pokemon has.
   * @type {Array}
   */
  weaknessesArray = [];

  calculatedAdjective = "Adjective";

  missingNo = {
    id: "-1",
    name: 'missingNo',
    height: 'Unknown',
    weight: 'Unknown',
    types: 'Unknown',
    weaknesses: 'Unknown',
    imagePath: '/assets/images/MissingNo.png'
  };

  pokemon = {
    id: "Loading",
    name: 'Loading',
    height: 'Loading',
    weight: 'Loading',
    types: "Loading",
    weaknesses: 'Loading',
    imagePath: ''
  };

  /**
   * This request looks at the current pokemon number, often set by the router, uses
   * the pokemon-api service to request the pokemons details and displays it on the page.
   * It also starts the process of calculating the weaknesses given the types.
   */
  updatePokemon() {
    if (this.pokemon.id === "-1") {
      this.loading = false;
      this.pokemon = this.missingNo;
    } else {
      this.papiService.retrieveOnePokemon(this.pokemon.id).subscribe(pokemonDetails => {
        this.loading = false;
        if (pokemonDetails) {
          this.pokemon.name = this.capitaliseString(pokemonDetails['name']);
          this.pokemon.height = pokemonDetails['height'].toString();
          this.pokemon.weight = pokemonDetails['weight'].toString();
          this.pokemon.imagePath = pokemonDetails['sprites'].front_default;

          this.getTypes(pokemonDetails);
          this.getWeaknesses(pokemonDetails);
        }
      }, err => {
        this.errorHandlingService.handleError(err);
      });
    }
  }

  /**
   * This takes in an array of new weaknesses and ensures that
   * @param {string[]} weaknessesForType
   * @returns {string}
   */
  addTypeWeaknesses(weaknessesForType): string {
    let i;
    for (i = 0; i < weaknessesForType.length; i++) {
      let capitalisedWeakness = this.capitaliseString(weaknessesForType[i]);
      if (this.weaknessesArray.indexOf(capitalisedWeakness) === -1) {
        this.weaknessesArray.push(capitalisedWeakness);
      }
    }
    return this.weaknessesArray.join(", ");
  }

  /**
   * This clear the weaknesses array before using the weaknesses service to generate
   * multiple observables that rebuild the weaknesses.
   * @param pokemonDetails
   */
  getWeaknesses(pokemonDetails) {
    this.weaknessesArray = [];
    this.weaknessService.getWeaknessFromPokemonDetails(pokemonDetails).subscribe((typeSpecificWeaknesses) => {
      this.pokemon.weaknesses = this.addTypeWeaknesses(typeSpecificWeaknesses);
    });
  }

  /**
   * Capitalises the inputted String so that it looks nicer :-)
   * @param {String} input
   * @returns {string}
   */
  capitaliseString(input: String) {
    return input.charAt(0).toUpperCase() + input.slice(1)
  }

  /**
   * This function takes in the returned pokemon data and iterates through the types data
   * to update the pokemon types list with just the names, with comma seperation.
   * It also uses the same itterator to trigger the call to get the weaknesses info.
   * @param pokemonDetails
   */
  getTypes(pokemonDetails) {
    let i,
      typesArray = pokemonDetails['types'],
      typeStringArray = [];

    for (i = 0; i < typesArray.length; i++) {
      typeStringArray.push(this.capitaliseString(typesArray[i].type.name));
    }
    this.pokemon.types = typeStringArray.join(", ");
  }

  /**
   * This uses the router to navigate back to the initial page.
   */
  showInitial() {
    this.router.navigate(['initial'])
  }
}
