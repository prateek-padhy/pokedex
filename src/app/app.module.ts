import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';

import { StoreModule } from '@ngrx/store';
import { pokemonReducer } from './store/pokemon/pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './store/pokemon/pokemon.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { PokedexModule } from './pokedex/pokedex.module';
import { PokemonDetailModule } from './pokemon-detail/pokemon-detail.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    PokedexModule,
    PokemonDetailModule,
    EffectsModule.forRoot([PokemonEffects]),
    StoreModule.forRoot({ pokemonState: pokemonReducer }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
