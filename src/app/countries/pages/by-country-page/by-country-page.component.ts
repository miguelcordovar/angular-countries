import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit, OnDestroy {

  public term: string = '';
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public countriesServiceSubscription?: Subscription;

  constructor (private countriesService : CountriesService) {}

  ngOnDestroy(): void {
    this.countriesServiceSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.term = this.countriesService.cacheStore.byCountry.term;
  }

  searchByCountry(term: string): void {
    this.isLoading = true;
    this.countriesServiceSubscription = this.countriesService.searchByCountry(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
