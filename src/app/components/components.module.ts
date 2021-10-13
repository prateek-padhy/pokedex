import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokelistComponent } from './pokelist/pokelist.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PokeformComponent } from './pokeform/pokeform.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PokemonComponent,
    PokelistComponent,
    HeaderComponent,
    FooterComponent,
    PokeformComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PokemonComponent,
    PokelistComponent,
    HeaderComponent,
    FooterComponent,
    PokeformComponent,
  ]
})
export class ComponentsModule { }
