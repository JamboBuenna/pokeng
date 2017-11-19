import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {LetterPickerComponent} from "./letter-picker/letter-picker.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LetterPickerComponent
  ]
})
export class PokemonSelectorModule {
}
