import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonApi } from '../store/pokemon/pokemon.api';
import { ComponentsModule } from '../components/components.module';
import { PokedexComponent } from './pokedex.component';



@NgModule({
  declarations: [
    PokedexComponent
  ],
  exports: [
    PokedexComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  providers: [
    PokemonApi
  ]
})
export class PokedexModule { }
