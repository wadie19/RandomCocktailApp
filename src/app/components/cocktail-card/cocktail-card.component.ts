import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cocktail-card',
  templateUrl: './cocktail-card.component.html',
  styleUrl: './cocktail-card.component.css'
})
export class CocktailCardComponent {
  @Input() cocktail: any = {};
}
