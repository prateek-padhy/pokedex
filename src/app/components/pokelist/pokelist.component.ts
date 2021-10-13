import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonsApiResponse, SortBy } from 'src/app/store/pokemon/pokemon.model';
@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss']
})
export class PokelistComponent implements OnChanges, OnInit {

  @Input() pokemons!: Array<PokemonsApiResponse>;
  @Input() key!: string;
  @Input() sortBy!: SortBy;

  filteredList: Array<PokemonsApiResponse> = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sortResult(this.sortBy);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.key?.currentValue !== changes.key?.previousValue){
      this.filteredList = this.pokemons.filter(pokemon => pokemon.name.match(this.key))
    } else{
      this.filteredList = this.pokemons;
    }

    if(!this.filteredList?.length) return;

    this.sortResult(changes.sortBy?.currentValue);
  }

  private sortResult(sortBy: SortBy) {
    let sortedList = [...this.filteredList];
    //if undefined keep the currect sorting
    sortBy = sortBy ? sortBy : this.sortBy;

    if(SortBy.HEIGHT === sortBy){
      sortedList.sort((one, two) => (two.height - one.height));
    } else if(SortBy.WEIGHT === sortBy) {
      sortedList.sort((one, two) => (two.weight - one.weight));
    } else if(SortBy.NAME === sortBy) {
      sortedList.sort((one, two) => {
        const firstName = one.name, secondName = two.name;
        return firstName < secondName ? -1 : (firstName > secondName ? 1 : 0)
      })
    } else {
      sortedList.sort((one, two) => (one.id - two.id));
    }

    this.filteredList = sortedList;
  }

  getDetails = (id: number) => {
    this.router.navigate(['/pokemon', { id }], { relativeTo: this.route });
  } 
}
