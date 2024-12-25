import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../../services/cocktail.service';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent implements OnInit {
  cocktails: any[] = [];
  loading: boolean = false;
  
  constructor(private cocktailService: CocktailService) {}

  ngOnInit() {
    this.refreshCocktails();  
  }

  refreshCocktails() {
    this.loading = true;
    this.cocktailService.getRandomCocktails(3).subscribe(
      (responses) => {
        this.cocktails = responses.map((res) => res.drinks[0]);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching cocktails:', error);
        this.loading = false;
      }
    );
  }
}
