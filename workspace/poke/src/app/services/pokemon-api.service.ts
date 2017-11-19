import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class PokemonApiService {

  constructor(private http: HttpClient) {
  }

  baseApiPath = '/pokeapi/v2/'

  public retrieveOne(id: number): Observable<Pokemon> {
    var url = this.baseApiPath + "pokemon" + `/${id}`

    return this.http.get<Pokemon>(url, {
      params: new HttpParams().set('id', id.toString(10))
    });
  }

  public testServiceWiring() {
    alert("test")
  }
}

export interface Pokemon {
  id: number;
  name?: string;
}
