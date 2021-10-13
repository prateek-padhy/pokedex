import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SortBy } from '../store/pokemon/pokemon.model';
import { AppState } from '../store/state';

import { PokemonDetailComponent } from './pokemon-detail.component';

@Component({template: ''})
class DummyPokedexComponent {}

@Component({template: ''})
class DummyPokemonDetailComponent {}

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let router: Router;

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
      declarations: [ PokemonDetailComponent ],
      providers: [
        provideMockStore({initialState}),
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'pokedex', component: DummyPokedexComponent },
          { path: 'pokemon', component: DummyPokemonDetailComponent },
          { path: '',   redirectTo: '/pokedex', pathMatch: 'full' }, 
        ]),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back', () => {
    const routerSpy = spyOn(router, 'navigate')
    component.backToPokedex();
    const url = routerSpy.calls.first().args[0];
    
    expect(url).toEqual(['/']);
  })
});
