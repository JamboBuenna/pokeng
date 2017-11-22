import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PokemonApiService} from "../../services/pokemon-api.service";

@Component({
  selector: 'app-letter-picker',
  templateUrl: './letter-picker.component.html',
  styleUrls: ['./letter-picker.component.css']
})

/**
 * This component provides the pokemon entry field and submit button
 * and provides error handling for the invalid cases / requests
 */
export class LetterPickerComponent implements OnInit {

  constructor(
    private router: Router,
    private papiService: PokemonApiService
  ) {
  }

  ngOnInit() {
  }

  pokemonDetails = {
    firstLetter: ''
  };

  /**
   * This gets a random pokemon that matches the entered letter and then navigates to the results page.
   * This also temporarily provides error handling while I identify cases, in some cases this should probably move to
   * the form bindings so that the form / styling shows it blocks submission in invalid cases.
   */
  requestPokemon() {
    let firstLetter = this.pokemonDetails.firstLetter;
    if (firstLetter.length === 1) {
      let randomPokemon = this.papiService.getRandomPokemonByLetter(firstLetter);

      if (randomPokemon === undefined) {
        alert("No pokemon are available that start with the letter -" + this.pokemonDetails.firstLetter)
      }

      this.router.navigate(['results', {id: randomPokemon.id}])
    } else {
      alert("You need to enter one letter");
    }
  }

}
