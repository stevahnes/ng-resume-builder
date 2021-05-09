import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VERSION } from '../environments/version';
import {
  APP_TITLE,
  META_DESCRIPTION,
  META_KEYWORDS,
  META_LANGUAGE,
  META_LOGO_ALTERNATE_TEXT,
  META_LOGO_HEIGHT,
  META_LOGO_RELATIVE_PATH,
  META_LOGO_WIDTH,
  META_ROBOTS
} from './constants/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = APP_TITLE;
  version = VERSION.version;
  activeId = '';

  private readonly description = META_DESCRIPTION;
  private readonly keywords = META_KEYWORDS;

  private readonly baseUrl = window.location.port
    ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
    : `${window.location.protocol}//${window.location.hostname}`;
  private readonly imageUrl = `${this.baseUrl}${META_LOGO_RELATIVE_PATH}`;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private titleService: Title, private metaService: Meta) {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeId = this.router.url;
      }
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      { name: 'keywords', content: this.keywords },
      { name: 'description', content: this.description },
      { name: 'robots', content: META_ROBOTS },
      { property: 'og:locale', content: META_LANGUAGE },
      { property: 'og:title', content: this.title },
      { property: 'og:description', content: this.description },
      { property: 'og:url', content: this.baseUrl },
      { property: 'og:site_name', content: this.title },
      { property: 'og:image', content: this.imageUrl },
      { property: 'og:image:width', content: META_LOGO_WIDTH },
      { property: 'og:image:height', content: META_LOGO_HEIGHT },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image:alt', content: META_LOGO_ALTERNATE_TEXT }
    ]);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
