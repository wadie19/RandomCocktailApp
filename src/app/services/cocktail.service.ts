import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  constructor(private http: HttpClient) {}

  getRandomCocktails(count: number = 3): Observable<any[]> {
    const requests = Array.from({ length: count }, () => 
      this.http.get<any>(`${this.apiUrl}random.php?cacheBuster=${new Date().getTime()}`)
    );
    return forkJoin(requests);
  }

  getCocktailDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}lookup.php?i=${id}`);
  }
}
