import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BuilderComponent } from './builder.component';
import { FileDropDirective } from './directives/file-drop.directive';

describe('BuilderComponent', () => {
  let component: BuilderComponent;
  let fixture: ComponentFixture<BuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuilderComponent, FileDropDirective]
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
      component.uploadedFileName = 'SAMPLE_FILE';
      component.parseError = false;
      fixture.detectChanges();
      const generatePDFSpy = spyOn(component, 'generatePDF');
      const generateButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.generate-pdf')
      )[0].nativeElement;
      expect(generateButton).toBeTruthy();
      generateButton.click();
      expect(generatePDFSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('fileUpload', () => {
    it('should trigger onFileAdded when input has file', () => {
      spyOn(component, 'onFileAdded').and.callThrough();
      spyOn(component as any, 'processFile').and.callThrough();
      const fileInput: HTMLInputElement = fixture.debugElement.query(By.css('input[type=file]'))
        .nativeElement;
      const FILE_NAME = 'dummy.json';
      const dataTransfer = new DataTransfer();
      const file = new File(['RANDOM'], FILE_NAME);
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;
      fileInput.dispatchEvent(new Event('change'));
      expect(component.onFileAdded).toHaveBeenCalledTimes(1);
      expect(component.uploadedFileName).toEqual(FILE_NAME);
      expect((component as any).processFile).toHaveBeenCalledOnceWith(file);
    });

    it('should trigger onFileDropped when fileDropped output is emitted', () => {
      const directiveDebugElement = fixture.debugElement.query(By.directive(FileDropDirective));
      const directive = directiveDebugElement.injector.get(FileDropDirective);
      spyOn(component, 'onFileDropped').and.callThrough();
      spyOn(component as any, 'processFile').and.callThrough();
      const FILE_NAME = 'dummy.json';
      const file = new File(['RANDOM'], FILE_NAME);
      directive.fileDropped.emit(file);
      expect(component.onFileDropped).toHaveBeenCalledOnceWith(file);
      expect(component.uploadedFileName).toEqual(FILE_NAME);
      expect((component as any).processFile).toHaveBeenCalledOnceWith(file);
    });
  });

  describe('parseFileContent', () => {
    it('should update resume if parsing is successful', () => {
      (component as any).resume = {};
      const content = '{"testKey": "testVal"}';
      (component as any).parseFileContent(content);
      expect(component.parseError).toBeFalse();
      expect((component as any).resume).toEqual(JSON.parse(content));
    });

    it('should catch error and update parseError state if parsing is unsuccessful', () => {
      (component as any).resume = {};
      const content = 'UnexpectedChar{"testKey": "testVal"}';
      (component as any).parseFileContent(content);
      expect(component.parseError).toBeTrue();
      expect((component as any).resume).toEqual({});
    });
  });
});
