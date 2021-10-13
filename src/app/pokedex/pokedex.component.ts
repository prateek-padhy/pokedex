import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { POKEDEX_END_ID, POKEDEX_START_ID, PokemonsApiResponse, SortBy } from '../store/pokemon/pokemon.model';
import { getLimit, getOffset, getPokemons, getSortBy, isNextDisabled, isPreviousDisabled } from '../store/pokemon/pokemon.selector';
import { AppState } from '../store/state';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemons$: Observable<Array<PokemonsApiResponse>> = this.store.select(getPokemons);
  sort$: Observable<SortBy> = this.store.select(getSortBy);
  limit$: Observable<string> = this.store.select(getLimit);
  offset$: Observable<number> = this.store.select(getOffset)
  
  disableNext$: Observable<boolean> = this.store.select(isNextDisabled)
  disablePrevious$: Observable<boolean> = this.store.select(isPreviousDisabled)

  searchKey!: string;
  offset!: number;
  limit!: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.limit$.subscribe((limit) => {
      this.limit = parseInt(limit);
      this.getPokemons(this.offset, this.limit);
    })

    this.offset$.subscribe((offset) => {
      this.offset = offset;
      this.getPokemons(this.offset, this.limit);
    })
  }

  onSortChange = (sortBy: string) => {
    this.store.dispatch({type: '[Pokemon] Sorting change', payload: sortBy});
    
    localStorage.setItem("sort", sortBy);
  } 

  onLimitChange = (limit: string) => {
    this.store.dispatch({type: '[Pokemon] Limit change', payload: parseInt(limit)});
    this.getPokemons(this.offset, parseInt(limit));
  }

  onSearchKeyChange = (searchKey: string) => this.searchKey = searchKey;

  next = () => {
    this.offset = this.offset + this.limit;
    if((this.offset + this.limit) > POKEDEX_END_ID){
      this.limit = POKEDEX_END_ID - this.offset;
    }

    this.store.dispatch({type: '[Pokemon] Offset change', payload: this.offset });
    this.getPokemons(this.offset, this.limit);
  }

  previous = () => {
    this.offset = this.offset - this.limit;
    if(this.offset <= POKEDEX_START_ID){
      this.offset = POKEDEX_START_ID;
    }

    this.store.dispatch({type: '[Pokemon] Offset change', payload: this.offset})
    this.getPokemons(this.offset, this.limit);
  }

  getPokemons = (offset: number, limit: number) => {
    this.store.dispatch({ type: '[Pokemon] Clear Pokemon'});
    this.store.dispatch({ type: '[Pokemon] Get Pokemons', request: { offset, limit }});
  }
}
