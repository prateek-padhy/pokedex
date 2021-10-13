import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokeform',
  templateUrl: './pokeform.component.html',
  styleUrls: ['./pokeform.component.scss']
})
export class PokeformComponent {

  @Input() sortBy!: string;
  @Input() resultsPerPage!: string;
  @Input() searchKey!: string;

  @Output() sortChange = new EventEmitter<string>();
  @Output() limitChange = new EventEmitter<string>();
  @Output() searchKeyChange = new EventEmitter<string>();

  
  onSortChange = () => this.sortChange.emit(this.sortBy)

  onLimitChange = () => this.limitChange.emit(this.resultsPerPage);

  onSearchKeyChange = () => this.searchKeyChange.emit(this.searchKey);
}
