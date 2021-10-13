import { createSelector, Selector } from "@ngrx/store";
import { AppState } from "../state";
import { POKEDEX_END_ID, POKEDEX_START_ID, PokemonsApiResponse, PokemonState, SortBy } from "./pokemon.model";

export const getPokemonState: Selector<AppState, PokemonState> = createSelector(
    state => state.pokemonState,
    state => state,
);

export const getPokemons: Selector<AppState, Array<PokemonsApiResponse>> = createSelector(
    getPokemonState,
    state => state?.data,
);

export const getSortBy: Selector<AppState, SortBy> = createSelector(
    getPokemonState,
    state => state?.sortBy,
);

export const getLimit: Selector<AppState, string> = createSelector(
    getPokemonState,
    state => state?.limit.toString(),
);

export const getOffset: Selector<AppState, number> = createSelector(
    getPokemonState,
    state => state?.offset,
);

export const isNextDisabled: Selector<AppState, boolean> = createSelector(
    getPokemonState,
    state => ((state.offset + state.limit) >= POKEDEX_END_ID)
);

export const isPreviousDisabled: Selector<AppState, boolean> = createSelector(
    getPokemonState,
    state => (state.offset <= POKEDEX_START_ID)
);