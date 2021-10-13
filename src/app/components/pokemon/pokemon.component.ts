import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {
  
  @Input() id!: number;
  @Input() name!: string;
  @Input() height!: number;
  @Input() weight!: number;
  @Input() types!: Array<string>;
  @Input() imageSrc!: string;

  @Input() hideCTA: boolean = false;

  @Output() onGetdetails = new EventEmitter();

  findOutMore = () => this.onGetdetails.emit(this.id);
}
