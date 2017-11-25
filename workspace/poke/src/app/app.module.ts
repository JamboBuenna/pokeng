import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ResultsComponent} from './results/results.component';
import {InitialComponent} from './initial/initial.component';

import {ServicesModule} from './services/services.module';
import {FormsModule} from '@angular/forms';
import {PokemonSelectorModule} from './pokemon-selector/pokemon-selector.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


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
    AppRoutingModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
