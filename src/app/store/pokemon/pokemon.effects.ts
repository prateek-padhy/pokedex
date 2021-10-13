import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { merge, of } from "rxjs";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PokemonApi } from "./pokemon.api";
import { GET_POKEMONS } from "./pokemon.action";
import { PokemonsApiResponse } from "./pokemon.model";

@Injectable()
export class PokemonEffects {
    constructor(private actions$: Actions, private api: PokemonApi) {}

    getPokemonDetails$ = createEffect(() => this.actions$.pipe(
        ofType(GET_POKEMONS),
        mergeMap(({request: { offset, limit }}) => {
            let ids = [], currentId = offset;
            while(currentId < (offset + limit) ){
                ids.push(currentId++);
            }

            localStorage.setItem("offset", offset?.toString());
            localStorage.setItem("limit", limit.toString());

            return merge(
                ...ids.map( id => {
                    return this.api.getPokemonDetails(id).pipe(
                        map((pokemons: PokemonsApiResponse) => ({ type: '[Pokemon] Get Pokemons success', payload: pokemons })),
                        catchError((error: Error) => of({ type: '[Pokemon] Get Pokemons error', error: {error: error.message} })),
                    ) 
                })
            )
        })
    ));
}