import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonApiService} from "../services/pokemon-api.service";
import {ErrorHandlingService} from "../services/error-handling.service";
import {type} from "os";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private papiService: PokemonApiService,
              private errorHandlingService: ErrorHandlingService) {
  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] !== undefined) {
      this.pokemon.id = this.route.snapshot.params['id'];
      this.updatePokemon()
    }
  }

  loading = true;

  missingNo = {
    id: "-1",
    name: 'missingNo',
    height: 'Unknown',
    weight: 'Unknown',
    types: 'Unknown',
    weaknesses: 'Unknown',
    imagePath: '/assets/images/pokemonLogo.png'
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

  updatePokemon() {
    if (this.pokemon.id === "-1") {
      this.pokemon = this.missingNo;
    } else {
      this.papiService.retrieveOne(this.pokemon.id).subscribe(pokemonDetails => {
        this.loading = false;
        if (pokemonDetails) {
          this.pokemon.name = this.capitaliseString(pokemonDetails['name']);
          this.pokemon.height = pokemonDetails['height'].toString();
          this.pokemon.weight = pokemonDetails['weight'].toString();
          this.pokemon.imagePath = pokemonDetails['sprites'].front_default;

          this.getWeaknesses(pokemonDetails);
          this.getTypes(pokemonDetails);
        }
      }, err => {
        this.errorHandlingService.handleError(err);
      });
    }
  }

  /**
   * TODO - Get weaknesses
   * @param pokemonDetails
   */
  getWeaknesses(pokemonDetails) {
    this.pokemon.weaknesses = "I am a pokemon with no weakness"


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
   * @param pokemonDetails
   */
  getTypes(pokemonDetails) {
    debugger;
    var i,
      typesArray = pokemonDetails['types'],
      typeStringArray = [];

    for (i = 0; i < typesArray.length; i++) {
      typeStringArray.push(this.capitaliseString(typesArray[i].type.name));
    }
    this.pokemon.types = typeStringArray.join();
  }

  showInitial() {
    this.router.navigate(['initial'])
  }
}
