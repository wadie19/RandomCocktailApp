import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CocktailListComponent } from './cocktail-list.component';
import { CocktailService } from '../../services/cocktail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CocktailCardComponent } from '../cocktail-card/cocktail-card.component';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { MatButtonModule } from '@angular/material/button';


describe('CocktailListComponent', () => {
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;
  let mockCocktailService: jasmine.SpyObj<CocktailService>;

  const mockCocktails = [
    {
      idDrink: '11064',
      strDrink: "Banana Daiquiri",
      strCategory: "Ordinary Drink",
      strAlcoholic: 'Alcoholic',
      strGlass: "Champagne flute",
      strDrinkAlternate: null,
      strTags: "Fruity",
      strVideo: null,
      strIBA: null,
      strInstructions: "Pour all ingredients into shaker with ice cubes. Shake well. Strain in chilled cocktail glass.",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/k1xatq1504389300.jpg",      
    },
    {
      idDrink: "11007",
      strDrink: "Margarita",
      strDrinkAlternate: null,
      strTags: "IBA,ContemporaryClassic",
      strVideo: null,
      strCategory: "Ordinary Drink",
      strIBA: "Contemporary Classics",
      strAlcoholic: "Alcoholic",
      strGlass: "Cocktail glass",
      strInstructions: "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",

    },
    {
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

    },
  ];


  beforeEach(async () => {
    mockCocktailService = jasmine.createSpyObj('CocktailService', ['getRandomCocktails']);

    await TestBed.configureTestingModule({
      declarations: [CocktailListComponent, CocktailCardComponent],
      imports: [HttpClientTestingModule, MatCardModule, MatButtonModule, RouterTestingModule], // Add RouterTestingModule here
      providers: [{ provide: CocktailService, useValue: mockCocktailService }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CocktailListComponent);
    component = fixture.componentInstance;
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call refreshCocktails when refresh button is clicked', () => {
    mockCocktailService.getRandomCocktails.and.returnValue(of([{ drinks: mockCocktails }]));
    spyOn(component, 'refreshCocktails'); 

    const refreshButton = fixture.debugElement.query(By.css('.refresh-button'));
    refreshButton.triggerEventHandler('click', null);

    expect(component.refreshCocktails).toHaveBeenCalled();
  });


  it('should set loading to false after the cocktails are fetched', () => {
    mockCocktailService.getRandomCocktails.and.returnValue(of([{ drinks: mockCocktails }]));
    
    component.refreshCocktails();
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
  });

  it('should display an empty list if no cocktails are fetched', () => {
    mockCocktailService.getRandomCocktails.and.returnValue(of([])); 

    component.refreshCocktails();
    fixture.detectChanges();

    const cocktailCards = fixture.debugElement.queryAll(By.css('app-cocktail-card'));
    expect(cocktailCards.length).toBe(0);
  });
});
