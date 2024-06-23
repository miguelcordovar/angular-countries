import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @ViewChild('txtInput')
  private searchInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = 'Search...';

  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter();

  public search(): void {
    console.log('search-box...');
    const term = this.searchInput.nativeElement.value;
    console.log({ term });
    this.onSearch.emit(term);
  }
}
