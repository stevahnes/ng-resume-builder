import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BuilderComponent } from './builder.component';

describe('BuilderComponent', () => {
  let component: BuilderComponent;
  let fixture: ComponentFixture<BuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuilderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('generatePDF', () => {
    it('should trigger the core logic of the template selected to generate PDF', () => {
      const generatePDFSpy = spyOn(component, 'generatePDF');
      const generateButton: HTMLButtonElement = fixture.debugElement.queryAll(By.css('button'))[0]
        .nativeElement;
      generateButton.click();
      expect(generatePDFSpy).toHaveBeenCalledTimes(1);
    });
  });
});
