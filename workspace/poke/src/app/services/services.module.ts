import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonApiService} from "./pokemon-api.service";
import {HttpClientModule} from "@angular/common/http";
import {ErrorHandlingService} from "./error-handling.service";
import {WeaknessesService} from "./weaknesses.service";
import {AdjectivesService} from "./adjectives.service";
import {UtilService} from "./util.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    AdjectivesService,
    ErrorHandlingService,
    PokemonApiService,
    UtilService,
    WeaknessesService,
  ]
})
export class ServicesModule {
}
