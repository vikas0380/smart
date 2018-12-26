import { Component, ChangeDetectionStrategy } from '@angular/core';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators'
import { DataService, Person } from './shared/data.service';
import { Subject, Observable, of, concat } from 'rxjs';


@Component({
    selector: 'select-search',
    changeDetection: ChangeDetectionStrategy.Default,
    template: ` 
        <ng-select [items]="people3$ | async"
                   bindLabel="text"
                   [addTag]="true"
                   [multiple]="true"
                   [hideSelected]="true"
                   [loading]="people3Loading"
                   [typeahead]="people3input$"
                   [(ngModel)]="selectedPersons">
        </ng-select>
      
        <p style="margin-bottom:300px">
            Selected persons: {{selectedPersons | json}}
        </p>
    `
})
export class SelectSearchComponent {

    people3$: Observable<any[]>;
    people3Loading = false;
    people3input$ = new Subject<string>();
    selectedPersons: any[] = <any>[ { text: 'Other' }];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadPeople3();
    }

    customSearchFn(term: string, item: any) {
        term = term.toLocaleLowerCase();
        return item.name.toLocaleLowerCase().indexOf(term) > -1 || item.gender.toLocaleLowerCase() === term;
    }

  

    private loadPeople3() {
        this.people3$ = concat(
            of([]), // default items
            this.people3input$.pipe(
               debounceTime(200),
               distinctUntilChanged(),
               tap(() => this.people3Loading = true),
               switchMap(term => this.dataService.getAddress(term).pipe(
                   catchError(() => of([])), // empty list on error
                   tap(() => this.people3Loading = false)
               )) 
            )
        );
    }
}


