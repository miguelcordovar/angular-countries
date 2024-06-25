import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService implements OnInit {
  private readonly BASE_URL = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountry: {term: '', countries: []},
    byRegion:  {region: '', countries: []},
  };

  constructor(private httpClient: HttpClient) {
    this.getLocalStorage();
  }

  ngOnInit(): void {

  }

  private saveLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private getLocalStorage() {
    const cacheStore = localStorage.getItem('cacheStore');
    if (cacheStore) {
      this.cacheStore = JSON.parse(cacheStore);
    }
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  searchByCapital(term: string): Observable<Country[]> {
    const url = `${this.BASE_URL}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term, countries}),
        tap(() => this.saveLocalStorage())
      );
  }

  searchByCountry(term: string): Observable<Country[]> {
    const url = `${this.BASE_URL}/name/${term}`;
    return this.getCountriesRequest(url)
        .pipe(
          tap(countries => this.cacheStore.byCountry = {term, countries}),
          tap(() => this.saveLocalStorage())
        );
  }

  searchByRegion(term: Region): Observable<Country[]> {
    const url = `${this.BASE_URL}/region/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region: term, countries}),
        tap(() => this.saveLocalStorage())
      );
  }

  searchByAlphaCode(term: string): Observable<Country | null> {
    const url = `${this.BASE_URL}/alpha/${term}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }
}
