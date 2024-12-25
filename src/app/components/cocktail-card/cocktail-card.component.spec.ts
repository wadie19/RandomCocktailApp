import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailCardComponent } from './cocktail-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('CocktailCardComponent', () => {
  let component: CocktailCardComponent;
  let fixture: ComponentFixture<CocktailCardComponent>;

  const mockCocktail = {
    idDrink: "11008",
    strDrink: "Manhattan",
    strDrinkAlternate: null,
    strTags: "IBA,Classic,Alcoholic",
    strVideo: "https://www.youtube.com/watch?v=TFWPtkNoF4Y",
    strCategory: "Cocktail",
    strIBA: "Unforgettables",
    strAlcoholic: "Alcoholic",
    strGlass: "Cocktail glass",
    strInstructions: "Stirred over ice, strained into a chilled glass, garnished, and served up.",
    strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/yk70e31606771240.jpg",
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocktailCardComponent],
      imports: [RouterTestingModule, MatCardModule, MatButtonModule], 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CocktailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cocktail details when input is provided', () => {
    // Assign mock input data
    component.cocktail = mockCocktail;
    fixture.detectChanges(); // Trigger change detection

    // Verify the displayed details
    const nameEl = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    const categoryEl = fixture.debugElement.query(By.css('mat-card-subtitle')).nativeElement;
    const imageEl = fixture.debugElement.query(By.css('img')).nativeElement;
    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(nameEl.textContent).toContain('Manhattan');
    expect(categoryEl.textContent).toContain('Cocktail');
    expect(imageEl.src).toBe('https://www.thecocktaildb.com/images/media/drink/yk70e31606771240.jpg');
    expect(buttonEl.textContent).toContain('View Details');
  });

  it('should handle undefined cocktail input gracefully', () => {
    // Leave cocktail undefined
    component.cocktail = undefined;
    fixture.detectChanges();

    // Assert no errors and placeholder state
    const nameEl = fixture.debugElement.query(By.css('mat-card-title'));
    const categoryEl = fixture.debugElement.query(By.css('mat-card-subtitle'));
    const imageEl = fixture.debugElement.query(By.css('img'));

    expect(nameEl).toBeFalsy();
    expect(categoryEl).toBeFalsy();
    expect(imageEl).toBeFalsy();
  });
  
});
