import { Component } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart';
  exampleSourceUrl: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private config: NgSelectConfig
) {
    this.config.placeholder = 'Select item';
}

ngOnInit() {
  this.setTitle();
}

private setTitle() {
  this.router.events
      .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => this.activatedRoute),
          map((route) => {
              while (route.firstChild) {
                  route = route.firstChild;
              }
              return route;
          }),
          filter((route) => route.outlet === 'primary'),
          mergeMap((route) => route.data)
      )
      .subscribe((event) => {
          this.title = event['title'];
          this.titleService.setTitle(this.title);
         // this.exampleSourceUrl = `https://github.com/ng-select/ng-select/tree/master/demo/app/examples/${event['fileName']}`;
      });
}
}