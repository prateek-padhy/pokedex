import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { PokemonDetailComponent } from './pokemon-detail.component';



@NgModule({
  declarations: [PokemonDetailComponent],
  exports: [PokemonDetailComponent],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class PokemonDetailModule {}
