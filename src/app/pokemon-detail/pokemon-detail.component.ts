import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PokemonsApiResponse } from '../store/pokemon/pokemon.model';
import { getPokemons } from '../store/pokemon/pokemon.selector';
import { AppState } from '../store/state';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon!: PokemonsApiResponse;

  constructor(private router: Router,private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
     combineLatest([this.route.paramMap, this.store.select(getPokemons)]).subscribe(
       ([params, pokemons]) => {
         this.pokemon = pokemons.find(poke => poke.id === Number(params.get('id')))!;
       }
     )
  }

  backToPokedex = () => this.router.navigate(['/']);

}
