import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LetterPickerComponent} from './pokemon-selector/letter-picker/letter-picker.component';
import {AppRoutingModule} from "./app-routing.module";
import {ResultsComponent} from './results/results.component';
import {InitialComponent} from './initial/initial.component';


@NgModule({
  declarations: [
    AppComponent,
    LetterPickerComponent,
    ResultsComponent,
    InitialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
