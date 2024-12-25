import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailDetailsComponent } from './cocktail-details.component';
import { CocktailService } from '../../services/cocktail.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('CocktailDetailsComponent', () => {
  let component: CocktailDetailsComponent;
  let fixture: ComponentFixture<CocktailDetailsComponent>;
  let mockCocktailService: jasmine.SpyObj<CocktailService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockCocktailDetails = {
    drinks: [
      {
        idDrink: "11064",
        strDrink: "Banana Daiquiri",
        strIngredient1: "Light rum",
        strMeasure1: "1 1/2 oz",
        strIngredient2: "Triple sec",
        strMeasure2: "1 tblsp",
        strIngredient3: "Banana",
        strMeasure3: "1",
        strIngredient4: "Lime juice",
        strMeasure4: "1 1/2 oz",
        strIngredient5: "Sugar",
        strMeasure5: "1 tsp",
        strIngredient6: "Cherry",
        strMeasure6: "1",
        strIngredient7: null,
        strMeasure7: null,
      },
    ],
  };
  beforeEach(async () => {

    mockCocktailService = jasmine.createSpyObj('CocktailService', ['getCocktailDetails']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CocktailDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CocktailService, useValue: mockCocktailService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '11064' }),
            },
          },
        },
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(CocktailDetailsComponent);
    component = fixture.componentInstance;
    mockCocktailService.getCocktailDetails.and.returnValue(of(mockCocktailDetails));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch cocktail details on initialization', () => {
    component.ngOnInit();
    expect(mockCocktailService.getCocktailDetails).toHaveBeenCalledWith('11064');
    expect(component.cocktail).toEqual(mockCocktailDetails.drinks[0]);
  });

  it('should return cocktail ingredients with measurements', () => {
    component.cocktail = mockCocktailDetails.drinks[0];

    const ingredients = component.cocktailIngredients();

    expect(ingredients).toEqual([
      '1 1/2 oz Light rum',
      '1 tblsp Triple sec',
      '1 Banana',
      '1 1/2 oz Lime juice',
      '1 tsp Sugar',
      '1 Cherry',
    ]);
  });

  it('should navigate back to cocktail list on goBack', () => {
    component.goBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cocktail-list']);
  });
  

});
