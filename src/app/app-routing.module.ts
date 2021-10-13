import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  { path: 'pokedex', component: PokedexComponent },
  { path: 'pokemon', component: PokemonDetailComponent },
  { path: '',   redirectTo: '/pokedex', pathMatch: 'full' }, // redirect to `pokedex` page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
