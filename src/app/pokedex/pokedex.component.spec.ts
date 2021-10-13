import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { routes } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';
import * as actions from '../store/pokemon/pokemon.action';
import { SortBy } from '../store/pokemon/pokemon.model';
import { AppState } from '../store/state';

import { PokedexComponent } from './pokedex.component';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;
  let store: MockStore<AppState>;

  const initialState = {
    pokemonState: {
      isLoading: false,
      data: [],
      limit: 10,
      offset: 20,
      sortBy: SortBy.HEIGHT,
      error: "",
    }
  } as AppState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexComponent ],
      imports: [
        ComponentsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('short change action should be called', () => {
    component.onSortChange(SortBy.NAME);
    expect(store.dispatch).toHaveBeenCalledWith(actions.CHANGE_SORTING(SortBy.NAME));
  })

  it('limit change action should be called', () => {
    component.onLimitChange("10");
    expect(store.dispatch).toHaveBeenCalledWith(actions.CHANGE_LIMIT(10));
  })

  it('offset change action should be called', () => {
    component.next();
    expect(store.dispatch).toHaveBeenCalledWith(actions.CHANGE_OFFSET(initialState.pokemonState.limit + initialState.pokemonState.offset));
  })

  it('offset change action should be called', () => {
    component.previous();
    expect(store.dispatch).toHaveBeenCalledWith(actions.CHANGE_OFFSET(initialState.pokemonState.offset - initialState.pokemonState.limit));
  })
  
  it('offset change action should be called', () => {
    const offset = 10, limit = 10;
    component.getPokemons(offset, limit);
    expect(store.dispatch).toHaveBeenCalledWith(actions.CLEAR_RESULT());
    expect(store.dispatch).toHaveBeenCalledWith(actions.GET_POKEMONS({offset, limit}));
  })
});
