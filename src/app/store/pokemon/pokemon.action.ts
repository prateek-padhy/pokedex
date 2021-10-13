import { createAction } from '@ngrx/store';
import { PokemonsApiError, PokemonsApiResponse, GetPokemonRequest, SortBy } from './pokemon.model';

export const GET_POKEMONS  = createAction('[Pokemon] Get Pokemons', (request: GetPokemonRequest) => ({request}));
export const GET_POKEMONS_SUCCESS = createAction('[Pokemon] Get Pokemons success', (payload: PokemonsApiResponse) => ({payload}));
export const GET_POKEMONS_ERROR = createAction('[Pokemon] Get Pokemons error', (error: PokemonsApiError) => ({error}));

export const CHANGE_SORTING  = createAction('[Pokemon] Sorting change', (payload: SortBy) => ({payload}));
export const CHANGE_LIMIT  = createAction('[Pokemon] Limit change', (payload: number) => ({payload}));
export const CHANGE_OFFSET = createAction('[Pokemon] Offset change', (payload: number) => ({payload}));

export const CLEAR_RESULT  = createAction('[Pokemon] Clear Pokemon');