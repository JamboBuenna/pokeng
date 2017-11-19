import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {ResultsComponent} from './results/results.component';
import {InitialComponent} from './initial/initial.component';

import {ServicesModule} from "./services/services.module";
import {FormsModule} from "@angular/forms";
import {PokemonSelectorModule} from "./pokemon-selector/pokemon-selector.module";


@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServicesModule,
    PokemonSelectorModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
