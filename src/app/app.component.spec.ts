import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgbModule],
      declarations: [AppComponent],
      providers: [Title, Meta]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it(`should have as title 'NgResume'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.title).toEqual('NgResume');
    const title: Title = TestBed.inject(Title);
    expect(title.getTitle()).toEqual(app.title);
  });

  it(`should have proper meta tags`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const meta: Meta = TestBed.inject(Meta);
    fixture.detectChanges();
    const metaTags: { [key: string]: string } = {
      'name=keywords': (app as any).keywords,
      'name=description': (app as any).description,
      'name=robots': 'index, follow',
      'property="og:locale"': 'en_US',
      'property="og:title"': app.title,
      'property="og:description"': (app as any).description,
      'property="og:url"': (app as any).baseUrl,
      'property="og:site_name"': app.title,
      'property="og:image"': (app as any).imageUrl,
      'property="og:image:width"': '2560',
      'property="og:image:height"': '2560',
      'name="twitter:card"': 'summary_large_image',
      'name="twitter:image:alt"': 'NgResume Logo'
    };
    Object.keys(metaTags).forEach((metaTag) => {
      const metaElement: HTMLMetaElement = meta.getTag(metaTag) as HTMLMetaElement;
      expect(metaElement).toBeTruthy();
      expect(metaElement.content).toBe(metaTags[metaTag]);
    });
  });
});
