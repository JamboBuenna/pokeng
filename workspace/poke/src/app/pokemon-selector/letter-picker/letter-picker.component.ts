import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PokemonApiService} from "../../services/pokemon-api.service";

@Component({
  selector: 'app-letter-picker',
  templateUrl: './letter-picker.component.html',
  styleUrls: ['./letter-picker.component.css']
})
export class LetterPickerComponent implements OnInit {

  constructor(private router: Router,
              private papiService: PokemonApiService) {
  }

  ngOnInit() {
  }

  pokemonDetails = {
    firstLetter: ''
  };

  requestPokemon() {
    let randomPokemon = this.papiService.getRandomPokemonByLetter(this.pokemonDetails.firstLetter);
    this.router.navigate(['results', {id: randomPokemon.id}])

  }

}
