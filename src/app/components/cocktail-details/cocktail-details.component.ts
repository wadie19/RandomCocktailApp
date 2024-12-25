import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from '../../services/cocktail.service';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.css'
})
export class CocktailDetailsComponent {
  cocktail: any;

  constructor(
    private route: ActivatedRoute,
    private cocktailService: CocktailService,
    private router : Router
  ) {}

  ngOnInit(): void {
    const cocktailId = this.route.snapshot.paramMap.get('id');
    
    if (cocktailId) {
      this.cocktailService.getCocktailDetails(cocktailId).subscribe((data) => {
        this.cocktail = data.drinks[0];
      });
    }
  }
  cocktailIngredients(): string[] {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = this.cocktail[`strIngredient${i}`];
      const measure = this.cocktail[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  }

  goBack(): void {
    this.router.navigate(['/cocktail-list']);
  }
}
