import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UtilService} from './util.service';

declare var require: any;

@Injectable()
export class PokemonApiService {

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) {

    const wrapper = require('pokeapi-js-wrapper');
    this.pokedex = new wrapper.Pokedex();


    this.mapToLetter();
  }

  baseApiPath = '/v2/';

  // This was pre-generated using the api & curl, after seeing the fair use policy on the api
  // If requested can change, or add additional pokemon.

  /*
    This can be gathered by doing this... As it gets round the proxy & fair use limitations
    and loads all the Pokemon. I didn't consider this fair on the people hosting the service though.

    const results = await Promise.all(
      range(1, 50).map(async id => {
        await delay(500);
        return getPokemon(id);
      })
    );
   */

  pokedex = undefined;

  realPokemon = [
    {id: 1, name: 'Bulbasaur'},
    {id: 2, name: 'Ivysaur'},
    {id: 3, name: 'Venusaur'},
    {id: 4, name: 'Charmander'},
    {id: 5, name: 'Charmeleon'},
    {id: 6, name: 'Charizard'},
    {id: 7, name: 'Squirtle'},
    {id: 8, name: 'Wartortle'},
    {id: 9, name: 'Blastoise'},
    {id: 10, name: 'Caterpie'},
    {id: 11, name: 'Metapod'},
    {id: 12, name: 'Butterfree'},
    {id: 13, name: 'Weedle'},
    {id: 14, name: 'Kakuna'},
    {id: 15, name: 'Beedrill'},
    {id: 16, name: 'Pidgey'},
    {id: 17, name: 'Pidgeotto'},
    {id: 18, name: 'Pidgeot'},
    {id: 19, name: 'Rattata'},
    {id: 20, name: 'Raticate'},
    {id: 21, name: 'Spearow'},
    {id: 22, name: 'Fearow'},
    {id: 23, name: 'Ekans'},
    {id: 24, name: 'Arbok'},
    {id: 25, name: 'Pikachu'},
    {id: 26, name: 'Raichu'},
    {id: 27, name: 'Sandshrew'},
    {id: 28, name: 'Sandslash'},
    {id: 29, name: 'Nidoran♀'},
    {id: 30, name: 'Nidorina'},
    {id: 31, name: 'Nidoqueen'},
    {id: 32, name: 'Nidoran♂'},
    {id: 33, name: 'Nidorino'},
    {id: 34, name: 'Nidoking'},
    {id: 35, name: 'Clefairy'},
    {id: 36, name: 'Clefable'},
    {id: 37, name: 'Vulpix'},
    {id: 38, name: 'Ninetales'},
    {id: 39, name: 'Jigglypuff'},
    {id: 40, name: 'Wigglytuff'},
    {id: 41, name: 'Zubat'},
    {id: 42, name: 'Golbat'},
    {id: 43, name: 'Oddish'},
    {id: 44, name: 'Gloom'},
    {id: 45, name: 'Vileplume'},
    {id: 46, name: 'Paras'},
    {id: 47, name: 'Parasect'},
    {id: 48, name: 'Venonat'},
    {id: 49, name: 'Venomoth'},
    {id: 50, name: 'Diglett'},
    {id: 51, name: 'Dugtrio'},
    {id: 52, name: 'Meowth'},
    {id: 53, name: 'Persian'},
    {id: 54, name: 'Psyduck'},
    {id: 55, name: 'Golduck'},
    {id: 56, name: 'Mankey'},
    {id: 57, name: 'Primeape'},
    {id: 58, name: 'Growlithe'},
    {id: 59, name: 'Arcanine'},
    {id: 60, name: 'Poliwag'},
    {id: 61, name: 'Poliwhirl'},
    {id: 62, name: 'Poliwrath'},
    {id: 63, name: 'Abra'},
    {id: 64, name: 'Kadabra'},
    {id: 65, name: 'Alakazam'},
    {id: 66, name: 'Machop'},
    {id: 67, name: 'Machoke'},
    {id: 68, name: 'Machamp'},
    {id: 69, name: 'Bellsprout'},
    {id: 70, name: 'Weepinbell'},
    {id: 71, name: 'Victreebel'},
    {id: 72, name: 'Tentacool'},
    {id: 73, name: 'Tentacruel'},
    {id: 74, name: 'Geodude'},
    {id: 75, name: 'Graveler'},
    {id: 76, name: 'Golem'},
    {id: 77, name: 'Ponyta'},
    {id: 78, name: 'Rapidash'},
    {id: 79, name: 'Slowpoke'},
    {id: 80, name: 'Slowbro'},
    {id: 81, name: 'Magnemite'},
    {id: 82, name: 'Magneton'},
    {id: 83, name: 'Farfetch’d'},
    {id: 84, name: 'Doduo'},
    {id: 85, name: 'Dodrio'},
    {id: 86, name: 'Seel'},
    {id: 87, name: 'Dewgong'},
    {id: 88, name: 'Grimer'},
    {id: 89, name: 'Muk'},
    {id: 90, name: 'Shellder'},
    {id: 91, name: 'Cloyster'},
    {id: 92, name: 'Gastly'},
    {id: 93, name: 'Haunter'},
    {id: 94, name: 'Gengar'},
    {id: 95, name: 'Onix'},
    {id: 96, name: 'Drowzee'},
    {id: 97, name: 'Hypno'},
    {id: 98, name: 'Krabby'},
    {id: 99, name: 'Kingler'},
    {id: 100, name: 'Voltorb'},
    {id: 101, name: 'Electrode'},
    {id: 102, name: 'Exeggcute'},
    {id: 103, name: 'Exeggutor'},
    {id: 104, name: 'Cubone'},
    {id: 105, name: 'Marowak'},
    {id: 106, name: 'Hitmonlee'},
    {id: 107, name: 'Hitmonchan'},
    {id: 108, name: 'Lickitung'},
    {id: 109, name: 'Koffing'},
    {id: 110, name: 'Weezing'},
    {id: 111, name: 'Rhyhorn'},
    {id: 112, name: 'Rhydon'},
    {id: 113, name: 'Chansey'},
    {id: 114, name: 'Tangela'},
    {id: 115, name: 'Kangaskhan'},
    {id: 116, name: 'Horsea'},
    {id: 117, name: 'Seadra'},
    {id: 118, name: 'Goldeen'},
    {id: 119, name: 'Seaking'},
    {id: 120, name: 'Staryu'},
    {id: 121, name: 'Starmie'},
    {id: 122, name: 'Mr. Mime'},
    {id: 123, name: 'Scyther'},
    {id: 124, name: 'Jynx'},
    {id: 125, name: 'Electabuzz'},
    {id: 126, name: 'Magmar'},
    {id: 127, name: 'Pinsir'},
    {id: 128, name: 'Tauros'},
    {id: 129, name: 'Magikarp'},
    {id: 130, name: 'Gyarados'},
    {id: 131, name: 'Lapras'},
    {id: 132, name: 'Ditto'},
    {id: 133, name: 'Eevee'},
    {id: 134, name: 'Vaporeon'},
    {id: 135, name: 'Jolteon'},
    {id: 136, name: 'Flareon'},
    {id: 137, name: 'Porygon'},
    {id: 138, name: 'Omanyte'},
    {id: 139, name: 'Omastar'},
    {id: 140, name: 'Kabuto'},
    {id: 141, name: 'Kabutops'},
    {id: 142, name: 'Aerodactyl'},
    {id: 143, name: 'Snorlax'},
    {id: 144, name: 'Articuno'},
    {id: 145, name: 'Zapdos'},
    {id: 146, name: 'Moltres'},
    {id: 147, name: 'Dratini'},
    {id: 148, name: 'Dragonair'},
    {id: 149, name: 'Dragonite'},
    {id: 150, name: 'Mewtwo'},
    {id: 151, name: 'Mew'},
  ];

  // This gets generated at start-up of the service
  pokemon = {};

  /**
   * Orders the pokemon in the pokemon object, which sorts them by letter.
   * TODO I should write a test for this.
   */
  private mapToLetter() {
    let a, b, letterMatcher;
    for (a = 0; a < 26; a++) {
      letterMatcher = (a + 10).toString(36);
      this.pokemon[letterMatcher] = [];
      for (b = 0; b < this.realPokemon.length; b++) {
        if (this.realPokemon[b].name.toLowerCase().startsWith(letterMatcher)) {
          this.pokemon[letterMatcher].push(this.realPokemon[b]);
        }
      }
    }
  }

  /**
   * This function looks at the available pokemon, and works out how many match that letter
   * It then takes a random one from that set and uses the retrieveOnePokemon call to get it.
   * @param {String} letter
   */
  public getRandomPokemonByLetter(letter: string) {

    const relevantPokemon = this.pokemon[letter];

    if (relevantPokemon.length === 0) {
      return {
        id: -1,
        name: 'missingNo'
      };
    } else {
      const numberOfPokemon = relevantPokemon.length;
      const randomPokemonIndex = this.utilService.getRandomInt(1, numberOfPokemon) - 1;
      const chosenPokemon = relevantPokemon[randomPokemonIndex];

      console.log('Out of ' + numberOfPokemon + ' Pokemon that matched ' + letter +
        '. You chose number ' + chosenPokemon.id + ' ' + chosenPokemon.name);
      return chosenPokemon;
    }
  }

  public retrieveOnePokemon(id: String): Observable<Pokemon> {
    const url = this.baseApiPath + 'pokemon' + `/${id}`;

    /*The poke-api team also provide a wrapper, however that that is also currently not
     working with CORS requests
   this.pokedex.getPokemonByName('Abra').then(function (response) {
     console.log(response);
   });
   */


    return this.http.get<Pokemon>(url, {
      headers: new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Credentials', 'true')
        .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
        .set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With,' +
          ' Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    });
  }

  public retrieveTypeFromUrl(url: string): Observable<PokemonType> {

    return this.http.get<Pokemon>(url, {
      headers: new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET')
        .set('User-Agent', '')

    });
  }

}

export interface Pokemon {
  id: number;
  name?: string;
}

export interface PokemonType {
  id: number;
}
