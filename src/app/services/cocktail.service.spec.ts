import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CocktailService } from './cocktail.service';

describe('CocktailService', () => {
  let service: CocktailService;
  let httpMock: HttpTestingController;

  // Mock data to test the service
  const mockCocktailResponse = {
    drinks: [
      {
        "idDrink": "11064",
          "strDrink": "Banana Daiquiri",
          "strDrinkAlternate": null,
          "strTags": "Fruity",
          "strVideo": null,
          "strCategory": "Ordinary Drink",
          "strIBA": null,
          "strAlcoholic": "Alcoholic",
          "strGlass": "Champagne flute",
          "strInstructions": "Pour all ingredients into shaker with ice cubes. Shake well. Strain in chilled cocktail glass.",
      }
    ]
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CocktailService]
    });
    service = TestBed.inject(CocktailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should fetch cocktail details by ID', () => {
    const cocktailId = '11064';

    service.getCocktailDetails(cocktailId).subscribe(cocktail => {
      expect(cocktail.drinks[0].idDrink).toBe(cocktailId);
      expect(cocktail.drinks[0].strDrink).toBe(mockCocktailResponse.drinks[0].strDrink);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('lookup.php')
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCocktailResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });

});
