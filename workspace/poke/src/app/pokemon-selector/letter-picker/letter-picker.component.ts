import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PokemonApiService} from "../../services/pokemon-api.service";
import {ErrorHandlingService} from "../../services/error-handling.service";

@Component({
  selector: 'app-letter-picker',
  templateUrl: './letter-picker.component.html',
  styleUrls: ['./letter-picker.component.css']
})
export class LetterPickerComponent implements OnInit {

  constructor(private router: Router,
              private errorHandlingService: ErrorHandlingService,
              private papiService: PokemonApiService) {
  }

  ngOnInit() {
  }

  requestPokemon() {


    this.papiService.retrieveOne(1)
      .subscribe(success => {
        if (success) {
          debugger;
        }
      }, err => {
        this.errorHandlingService.handleError(err);
      });



  }

  showResults() {
    this.router.navigate(['results']);
  }

}
