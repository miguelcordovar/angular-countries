import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private readonly BASE_URL = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

  searchByCapital(term: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.BASE_URL}/capital/${term}`)
      .pipe(catchError((error) => of([])));
  }

  searchByCountry(term: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.BASE_URL}/name/${term}`)
      .pipe(catchError((error) => of([])));
  }

  searchByRegion(term: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.BASE_URL}/region/${term}`)
      .pipe(catchError((error) => of([])));
  }

  searchByAlphaCode(term: string): Observable<Country | null> {
    return this.httpClient
      .get<Country[]>(`${this.BASE_URL}/alpha/${term}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }
}
