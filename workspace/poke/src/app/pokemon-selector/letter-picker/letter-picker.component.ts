import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-letter-picker',
  templateUrl: './letter-picker.component.html',
  styleUrls: ['./letter-picker.component.css']
})
export class LetterPickerComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  requestPokemon() {
    alert("Now I should request a pokemon")
  }

  showResults() {
    this.router.navigate(['results']);
  }

}
