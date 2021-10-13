import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pokedex';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const offset = localStorage.getItem("offset");
    offset && this.store.dispatch({type: '[Pokemon] Offset change', payload: parseInt(offset) });
    const limit = localStorage.getItem("limit");
    limit && this.store.dispatch({type: '[Pokemon] Limit change', payload: parseInt(limit)});
    const sort = localStorage.getItem("sort");
    limit && this.store.dispatch({type: '[Pokemon] Sorting change', payload: sort});
  }
}
