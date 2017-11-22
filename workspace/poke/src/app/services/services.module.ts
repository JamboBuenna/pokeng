import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonApiService} from "./pokemon-api.service";
import {HttpClientModule} from "@angular/common/http";
import {ErrorHandlingService} from "./error-handling.service";
import {WeaknessesService} from "./weaknesses.service";
import {AdjectivesService} from "./adjectives.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    AdjectivesService,
    ErrorHandlingService,
    WeaknessesService,
    PokemonApiService
  ]
})
export class ServicesModule {
}
