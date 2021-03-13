import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { BuilderComponent } from './builder.component';
import { EMPTY_RESUME } from './constants';
import { FileDropDirective } from './directives/file-drop.directive';
import { EditorComponent } from './editor/editor.component';
import { SAMPLE_RESUME_JSON } from './sample-data.builder.component.spec';

describe('BuilderComponent', () => {
  let component: BuilderComponent;
  let fixture: ComponentFixture<BuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, NgSelectModule],
      declarations: [BuilderComponent, EditorComponent, FileDropDirective]
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

  describe('applyCreateFromScratch', () => {
    it('should reset form, resume object, and uploadedFileName before displaying editor', () => {
      const content = SAMPLE_RESUME_JSON;
      (component as any).parseFileContent(content);
      fixture.detectChanges();
      const backButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.back-home')
      )[0].nativeElement;
      backButton.click();
      fixture.detectChanges();
      expect(component.displayFormEditor).toBeFalse();
      const createButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.create-new')
      )[0].nativeElement;
      createButton.click();
      expect((component as any).resume).toEqual(EMPTY_RESUME);
      expect(component.uploadedFileName).toEqual('');
      expect(component.resumeForm.invalid).toBeTrue();
      expect(component.displayFormEditor).toBeTrue();
    });
  });

  describe('setDisplayFormEditor', () => {
    it('should set displayFormEditor as per argument', () => {
      component.displayFormEditor = false;
      component.setDisplayFormEditor(true);
      expect(component.displayFormEditor).toBeTrue();
    });
  });

  describe('save', () => {
    it('should update and save resume JSON into a text file', () => {
      const content = SAMPLE_RESUME_JSON;
      (component as any).parseFileContent(content);
      fixture.detectChanges();
      const savePDFSpy = spyOn(component, 'save').and.callThrough();
      const updateResumeSpy = spyOn(component as any, 'updateResume');
      const saveButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.save-resume')
      )[0].nativeElement;
      expect(savePDFSpy).not.toHaveBeenCalled();
      expect(updateResumeSpy).not.toHaveBeenCalled();
      saveButton.click();
      expect(savePDFSpy).toHaveBeenCalledTimes(1);
      expect(updateResumeSpy).toHaveBeenCalledOnceWith(
        (component as any).resume,
        component.resumeForm
      );
    });
  });

  describe('generatePDF', () => {
    it('should not trigger the core logic of the template selected to generate PDF if form is invalid', () => {
      component.uploadedFileName = 'SAMPLE_FILE';
      component.parseError = false;
      component.displayFormEditor = true;
      fixture.detectChanges();
      const generatePDFSpy = spyOn(component, 'generatePDF').and.callThrough();
      const updateResumeSpy = spyOn(component as any, 'updateResume');
      const generateButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.generate-pdf')
      )[0].nativeElement;
      expect(generatePDFSpy).not.toHaveBeenCalled();
      expect(updateResumeSpy).not.toHaveBeenCalled();
      expect(generateButton).toBeTruthy();
      generateButton.click();
      expect(generatePDFSpy).not.toHaveBeenCalled();
      expect(updateResumeSpy).not.toHaveBeenCalled();
    });

    it('should trigger the core logic of the template selected to generate PDF if form is valid', () => {
      const content = SAMPLE_RESUME_JSON;
      (component as any).parseFileContent(content);
      fixture.detectChanges();
      const generatePDFSpy = spyOn(component, 'generatePDF').and.callThrough();
      const updateResumeSpy = spyOn(component as any, 'updateResume');
      const generateButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.generate-pdf')
      )[0].nativeElement;
      expect(generateButton).toBeTruthy();
      generateButton.click();
      expect(generatePDFSpy).toHaveBeenCalledTimes(1);
      expect(updateResumeSpy).toHaveBeenCalledOnceWith(
        (component as any).resume,
        component.resumeForm
      );
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
      const content = SAMPLE_RESUME_JSON;
      (component as any).parseFileContent(content);
      expect(component.parseError).toBeFalse();
      expect((component as any).resume).toEqual(JSON.parse(content));
      expect(component.resumeForm.invalid).toBeFalse();
    });

    it('should catch error and update parseError state if parsing is unsuccessful', () => {
      (component as any).resume = {};
      const content = 'UnexpectedChar{"testKey": "testVal"}';
      (component as any).parseFileContent(content);
      expect(component.parseError).toBeTrue();
      expect((component as any).resume).toEqual({});
      expect(component.resumeForm.invalid).toBeTrue();
    });
  });

  describe('updateResume', () => {
    it('should update resumeForm based on the new resume JSON data', () => {
      expect((component as any).resume).toEqual(EMPTY_RESUME);
      expect(component.resumeForm.invalid).toBeTrue();
      // first, parse the full sample resume JSON so that form is updated
      const content = SAMPLE_RESUME_JSON;
      (component as any).parseFileContent(content);
      fixture.detectChanges();
      expect((component as any).resume).toEqual(JSON.parse(SAMPLE_RESUME_JSON));
      expect(component.resumeForm.invalid).toBeFalse();
      // then, reset the resume
      (component as any).resume = { ...EMPTY_RESUME };
      expect((component as any).resume).toEqual(EMPTY_RESUME);
      // finally, test the updateResume function
      (component as any).updateResume((component as any).resume, component.resumeForm);
      expect((component as any).resume).toEqual(JSON.parse(SAMPLE_RESUME_JSON));
    });
  });
});
