import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Person {
    id: string;
    isActive: boolean;
    age: number;
    name: string;
    gender: string;
    company: string;
    email: string;
    phone: string;
    disabled?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

    getAddress(prefix : string) {
        const httpParams = new HttpParams().set("auth-id","")
        .set("auth-token","").set("prefix",prefix)
        return this.http.get<any[]>('https://us-autocomplete.api.smartystreets.com/suggest',{params:httpParams});
    }

    
}


