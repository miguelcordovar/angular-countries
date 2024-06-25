import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subject, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncerSuscription?: Subscription;
  private debouncer: Subject<string> = new Subject();

  @Input()
  public placeholder: string = 'Search...';

  @Input()
  public initialValue: string = '';

  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter();

  public onKeyPress(term: string): void {
    this.debouncer.next(term);
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(debounceTime(600))
    .subscribe((term) => {
      this.onSearch.emit(term);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }
}
