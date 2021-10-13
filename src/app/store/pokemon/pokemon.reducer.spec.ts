import { PokemonsApiError, PokemonsApiResponse, SortBy } from "./pokemon.model";
import * as reducer from "./pokemon.reducer"

describe('Pokemon Reducer', () => {
    describe('unknown aciton', () => {
        it('should return the default state', () => {
            const {defaultState} = reducer;
            const action = {
                type: 'unknown'
            };

            const newState = reducer.pokemonReducer(defaultState, action);
            
            expect(newState).toEqual(defaultState);
        })
    });

    describe('GET_POKEMONS', () => {
        it('should retun is Loading = true', () => {
            const {defaultState} = reducer;
            const action = {
                type: '[Pokemon] Get Pokemons',
                request: { offset: 10, limit: 10 },
            };

            const newState = reducer.pokemonReducer(defaultState, action);
            
            expect(newState).toEqual({ ...defaultState, isLoading: true });
        })
    })

    describe('GET_POKEMONS_SUCCESS', () => {
        it('should update the data in state', () => {
            const {defaultState} = reducer;
            const mockPokemonList = {
                id: 10,
            } as PokemonsApiResponse;

            const action = {
                type: '[Pokemon] Get Pokemons success',
                payload: mockPokemonList,
            };

            const newState = reducer.pokemonReducer(defaultState, action);
            
            expect(newState).toEqual({ ...defaultState, isLoading: false, data: [mockPokemonList] });
        })
    })

    describe('GET_POKEMONS_ERROR', () => {
        it('should update error in state', () => {
            const {defaultState} = reducer;
            const mockError = { 
                error: 'Error message'
            } as PokemonsApiError;

            const action = {
                type: '[Pokemon] Get Pokemons error',
                error: mockError,
            };

            const newState = reducer.pokemonReducer(defaultState, action);
            
            expect(newState).toEqual({ ...defaultState, isLoading: false, error: mockError.error });
        })
    })

    describe('CHANGE_SORTING', () => {
        it('should update the sorting', () => {
            const {defaultState} = reducer;

            const mockInput = SortBy.NAME;

            const action = {
                type: '[Pokemon] Sorting change',
                payload: mockInput,
            };

            const newState = reducer.pokemonReducer(defaultState, action);
            
            expect(newState).toEqual({ ...defaultState, sortBy: mockInput });
        })
    })

    describe('CHANGE_LIMIT', () => {
        it('should change limit', () => {
            const {defaultState} = reducer;

            const mockInput = 30;

            const action = {
                type: '[Pokemon] Limit change',
                payload: mockInput,
            };

            const newState = reducer.pokemonReducer(defaultState, action);
            
            expect(newState).toEqual({ ...defaultState, limit: mockInput });
        })
    })

    describe('CLEAR_RESULT', () => {
        it('should clear data in the state', () => {
            const {defaultState} = reducer;

            const mockInput = 30;

            const action = {
                type: '[Pokemon] Clear Pokemon'
            };

            const newState = reducer.pokemonReducer({...defaultState, data: [{
                id: 10,
            } as PokemonsApiResponse]}, action);
            
            expect(newState).toEqual({ ...defaultState, data: [] });
        })
    })
})