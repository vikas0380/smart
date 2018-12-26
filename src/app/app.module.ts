import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule, Routes } from '@angular/router';
import { SelectSearchComponent } from './search.component';
import { DataService } from './shared/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export const appRoutes: Routes = [
  {
      path: '',
      redirectTo: '/',
      pathMatch: 'full'
  },
  { path: 'filter', component: SelectSearchComponent, data: { title: 'Filter and autocomplete', fileName: 'search.component.ts' } },
];
@NgModule({
  declarations: [
    AppComponent,
    SelectSearchComponent
  ],
  imports: [
    BrowserModule,NgSelectModule,
    CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
       RouterModule.forRoot(
      appRoutes,
      {
          useHash: true
      }
  )
  ],
  providers: [DataService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
