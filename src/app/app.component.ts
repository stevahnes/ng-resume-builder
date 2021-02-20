import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'ng-resume';
  activeId = '';

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router) {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeId = this.router.url;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
