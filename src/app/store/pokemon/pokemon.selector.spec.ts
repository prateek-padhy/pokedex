import { AppState } from "../state"
import { PokemonsApiResponse, SortBy } from "./pokemon.model"
import * as selector from "./pokemon.selector";


describe('Pokemons Selector', () => {
    const mockState: AppState = {
        pokemonState: {
            data: [{
                id: 10,
            }, {
                id: 20,
            }] as Array<PokemonsApiResponse>,
            isLoading: false,
            limit: 10,
            offset: 0,
            sortBy: SortBy.NAME,
            error: 'error message',
        }
    } 

    it('should select pokemon state', () => {
        const result = selector.getPokemonState(mockState);

        expect(result).toEqual(mockState.pokemonState);
    })

    it('should select list of pokemons', () => {
        const result = selector.getPokemons(mockState);

        expect(result).toEqual(mockState.pokemonState.data);
    })

    it('should select sorting info.', () => {
        const result = selector.getSortBy(mockState);

        expect(result).toEqual(mockState.pokemonState.sortBy);
    })

    it('should select search limit in string', () => {
        const result = selector.getLimit(mockState);

        expect(result).toEqual(mockState.pokemonState.limit.toString());
    })

    it('should select search offset', () => {
        const result = selector.getOffset(mockState);

        expect(result).toEqual(mockState.pokemonState.offset);
    })
})
