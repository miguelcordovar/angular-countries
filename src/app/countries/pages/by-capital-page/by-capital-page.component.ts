import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { count, Subscription } from 'rxjs';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit, OnDestroy {

  public term: string = '';
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public countriesServiceSubscription?: Subscription;


  constructor (private countriesService : CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.term = this.countriesService.cacheStore.byCapital.term;
  }

  ngOnDestroy(): void {
    this.countriesServiceSubscription?.unsubscribe();
  }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesServiceSubscription = this.countriesService.searchByCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
