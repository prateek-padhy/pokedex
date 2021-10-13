import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing"
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable } from "rxjs";
import { TestScheduler } from "rxjs/testing"
import { AppState } from "../state"
import { PokemonApi } from "./pokemon.api";
import { PokemonEffects } from "./pokemon.effects";
import { SortBy } from "./pokemon.model";

describe('Pokemon Effect', () => {
    const initialState: AppState = { pokemonState: {
        data: [],
        isLoading: false,
        limit: 10,
        offset: 20,
        sortBy: SortBy.HEIGHT,
        error: 'Error message',
    }};
    const pokemonService = jasmine.createSpyObj('pokemonService', ['getPokemonDetails']);
    
    let effects: PokemonEffects;
    let actions: Observable<any>;
    let store: MockStore<AppState>;
    let testScheduler: TestScheduler;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PokemonEffects,
                provideMockStore({initialState}),
                provideMockActions(() => actions),
                {provide: PokemonApi, useValue: pokemonService}
            ]
        });

        effects = TestBed.inject(PokemonEffects);
        store = TestBed.inject(MockStore);

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })

    it('should be create', () => {
        expect(effects).toBeTruthy();
    });

    describe('getPokemonDetails$', () => {

        it('should fetch pokemon on the given range', () => {

            const mockPokemon = {
                id: 10,
            };
            const action = { type: '[Pokemon] Get Pokemons', request: { offset: 10, limit: 1 }};
            const outcome = { type: '[Pokemon] Get Pokemons success', payload: mockPokemon};

            testScheduler.run(({hot, cold, expectObservable}) => {
                actions = hot('-a', {a: action});
                const response = cold('-b|', {b: mockPokemon});

                pokemonService.getPokemonDetails.and.returnValue(response);

                expectObservable(effects.getPokemonDetails$).toBe('--b', {b: outcome})
            })
        });

    })
})