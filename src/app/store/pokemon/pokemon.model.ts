export enum SortBy {
    NAME = "name",
    HEIGHT = "height",
    WEIGHT = "weight",
    ID = "id",
}

export const POKEDEX_START_ID = 1;
export const POKEDEX_END_ID = 898;

export interface PokemonState {
    isLoading: boolean;
    data: Array<PokemonsApiResponse>;
    error?: string;

    sortBy: SortBy;
    limit: number;
    offset: number;
}

export interface Pokemon{
    name: string
}

export interface PokemonsApiResponse {
    id: number;
    name: string;
    weight: number;
    height: number;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            }
        }
    }
    abilities: Array<{
        ability: Ability
    }>;
    types: Array<{
        type: {
            name: string;
        }
    }>
    results: Array<Pokemon>;
    moves: Array<{
        move: {
            name: string;
        }
    }>
}

export interface Ability {
    name: string,
    url: string,
}

export interface PokemonsApiError {
    error: string;
}

// Request objects 
export interface GetPokemonRequest {
    offset: number;
    limit: number;
}