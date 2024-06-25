import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit, OnDestroy {

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public countriesServiceSubscription?: Subscription;


  constructor (private countriesService : CountriesService) {}

  ngOnDestroy(): void {
    this.countriesServiceSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(term: Region): void {

    this.selectedRegion = term;

    this.countriesServiceSubscription = this.countriesService.searchByRegion(term)
      .subscribe(countries => {
        this.countries = countries;
      });
  }
}
