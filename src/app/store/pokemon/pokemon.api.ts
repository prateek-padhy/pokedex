import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class PokemonApi {
    private endpoint = {
        getPokemonByRange: "https://pokeapi.co/api/v2/pokemon",
    }

    constructor(private http: HttpClient) {}

    getPokemonByRange = (offset: number = 0, limit: number = 20): Observable<any> => {
        const options = {
            params: {offset, limit },
        }

        return this.http.get<any>(
            this.endpoint.getPokemonByRange,
            options,
        );
    }

    getPokemonDetails = (pokedexNumber: number): Observable<any> => {
        return this.http.get<any>(
            `${this.endpoint.getPokemonByRange}/${pokedexNumber}`
        );
    }
}