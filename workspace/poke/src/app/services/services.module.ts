import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonApiService} from "./pokemon-api.service";
import {HttpClientModule} from "@angular/common/http";
import {ErrorHandlingService} from "./error-handling.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    ErrorHandlingService,
    PokemonApiService
  ]
})
export class ServicesModule {
}
