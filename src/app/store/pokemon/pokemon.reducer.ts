import { createReducer, on } from '@ngrx/store';
import { AppState } from '../state';
import { CHANGE_LIMIT, CHANGE_OFFSET, CHANGE_SORTING, CLEAR_RESULT, GET_POKEMONS, GET_POKEMONS_ERROR, GET_POKEMONS_SUCCESS } from './pokemon.action';
import { POKEDEX_START_ID, PokemonState, SortBy } from './pokemon.model';


/**
 * Define all store queries for Pokemons(s)
 */
 export namespace PokemonSelector {
    export const getPokemonsState = (state: AppState) => state.pokemonState;
  }

export const defaultState: PokemonState = {
    isLoading: false,
    data: [],
    error: "",

    sortBy: SortBy.ID,
    limit: 20,
    offset: POKEDEX_START_ID,
}

export const pokemonReducer = createReducer(defaultState, 
        on(GET_POKEMONS, (state) => ({...state, isLoading: true})),
        on(GET_POKEMONS_SUCCESS, (state, action) => {
          const isavaialbe = !!state.data.find(pokemon => pokemon.id === action.payload.id)
          if(isavaialbe) return {...state,  isLoading: false}
          return {...state, data: [...state.data, action.payload],  isLoading: false};
        }),
        on(GET_POKEMONS_ERROR, (state, action) => ({...state, error: action.error.error, isLoading: false})),

        on(CHANGE_SORTING, (state, action) => ({...state, sortBy: action.payload})),
        on(CHANGE_LIMIT, (state, action) => ({...state, limit: action.payload})),
        on(CHANGE_OFFSET, (state, action) => ({...state, offset: action.payload})),

        on(CLEAR_RESULT, (state) => ({...state, data: []})),
    );