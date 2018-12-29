import { Component, ChangeDetectionStrategy } from '@angular/core';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators'
import { DataService } from './shared/data.service';
import { Subject, Observable, of, concat } from 'rxjs';


@Component({
    selector: 'select-search',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './search.component.html'
})
export class SelectSearchComponent {
    //[multiple]="true"
    people3$: Observable<any[]>;
    people3Loading = false;
    people3input$ = new Subject<string>();
    selectedPersons: any = {
        city: "",
    state: "",
    street_line: "",
    text: ""
}

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


