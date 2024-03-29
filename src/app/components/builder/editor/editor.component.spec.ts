import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, NgSelectModule],
      declarations: [EditorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Dynamic Form', () => {
    it('should allow addition and deletion of work', () => {
      const workFormArrayControls: AbstractControl[] = component.getResumeWorkFormArrayControls(
        component.resumeForm
      );
      expect(workFormArrayControls.length).toEqual(1);
      const addButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.add-work')
      )[0].nativeElement;
      addButton.click();
      fixture.detectChanges();
      expect(workFormArrayControls.length).toEqual(2);
      const deleteButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.delete-work')
      )[0].nativeElement;
      deleteButton.click();
      fixture.detectChanges();
      expect(workFormArrayControls.length).toEqual(1);
      component.removeWorkFromFormArrayByIndex(component.resumeForm, 0);
      fixture.detectChanges();
      expect(workFormArrayControls.length).toEqual(1);
    });

    it('should allow addition and deletion of designation and period, but minimum is always 1', () => {
      const designationAndPeriodFormArrayControls: AbstractControl[][] = [
        component.getWorkDesignationFormArrayControls(
          component.getResumeWorkFormArrayControls(component.resumeForm)[0]
        ),
        component.getWorkPeriodsFormArrayControls(
          component.getResumeWorkFormArrayControls(component.resumeForm)[0]
        )
      ];
      for (const formControl of designationAndPeriodFormArrayControls) {
        expect(formControl.length).toEqual(1);
      }
      const addButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.add-designation-period')
      )[0].nativeElement;
      addButton.click();
      fixture.detectChanges();
      for (const formControl of designationAndPeriodFormArrayControls) {
        expect(formControl.length).toEqual(2);
      }
      const deleteButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.delete-designation-period')
      )[0].nativeElement;
      deleteButton.click();
      fixture.detectChanges();
      for (const formControl of designationAndPeriodFormArrayControls) {
        expect(formControl.length).toEqual(1);
      }
      component.removeDesignationAndPeriodFromFormArrayByIndex(
        component.getResumeWorkFormArrayControls(component.resumeForm)[0],
        0
      );
      fixture.detectChanges();
      for (const formControl of designationAndPeriodFormArrayControls) {
        expect(formControl.length).toEqual(1);
      }
    });

    it('should allow addition and deletion of description, but minimum is always 1', () => {
      const descriptionFormArrayControls: AbstractControl[] = component.getWorkDescriptionsFormArrayControls(
        component.getResumeWorkFormArrayControls(component.resumeForm)[0]
      );
      expect(descriptionFormArrayControls.length).toEqual(1);
      const addButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.add-description')
      )[0].nativeElement;
      addButton.click();
      fixture.detectChanges();
      expect(descriptionFormArrayControls.length).toEqual(2);
      const deleteButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.delete-description')
      )[0].nativeElement;
      deleteButton.click();
      fixture.detectChanges();
      expect(descriptionFormArrayControls.length).toEqual(1);
      component.removeWorkDescriptionFromFormArray(
        component.getResumeWorkFormArrayControls(component.resumeForm)[0],
        0
      );
      fixture.detectChanges();
      expect(descriptionFormArrayControls.length).toEqual(1);
    });

    it('should allow addition and deletion of education, but minimum is always 1', () => {
      const educationFormArrayControls: AbstractControl[] = component.getResumeEducationFormArrayControls(
        component.resumeForm
      );
      expect(educationFormArrayControls.length).toEqual(1);
      const addButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.add-education')
      )[0].nativeElement;
      addButton.click();
      fixture.detectChanges();
      expect(educationFormArrayControls.length).toEqual(2);
      const deleteButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.delete-education')
      )[0].nativeElement;
      deleteButton.click();
      fixture.detectChanges();
      expect(educationFormArrayControls.length).toEqual(1);
      component.removeEducationFromFormArrayByIndex(component.resumeForm, 0);
      fixture.detectChanges();
      expect(educationFormArrayControls.length).toEqual(1);
    });

    it('should allow addition and deletion of qualification, but minimum is always 1', () => {
      const qualificationFormArrayControls: AbstractControl[] = component.getEducationQualificationFormArrayControls(
        component.getResumeEducationFormArrayControls(component.resumeForm)[0]
      );
      expect(qualificationFormArrayControls.length).toEqual(1);
      const addButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.add-qualification')
      )[0].nativeElement;
      addButton.click();
      fixture.detectChanges();
      expect(qualificationFormArrayControls.length).toEqual(2);
      const deleteButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.delete-qualification')
      )[0].nativeElement;
      deleteButton.click();
      fixture.detectChanges();
      expect(qualificationFormArrayControls.length).toEqual(1);
      component.removeQualificationFromFormArrayByIndex(
        component.getResumeEducationFormArrayControls(component.resumeForm)[0],
        0
      );
      fixture.detectChanges();
      expect(qualificationFormArrayControls.length).toEqual(1);
    });

    it('should allow addition and deletion of award or certification, but minimum is always 1', () => {
      const awardOrCertificationFormArrayControls: AbstractControl[] = component.getResumeAwardsAndCertificationsFormArrayControls(
        component.resumeForm
      );
      expect(awardOrCertificationFormArrayControls.length).toEqual(1);
      const addButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.add-award-certification')
      )[0].nativeElement;
      addButton.click();
      fixture.detectChanges();
      expect(awardOrCertificationFormArrayControls.length).toEqual(2);
      const deleteButton: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button.delete-award-certification')
      )[0].nativeElement;
      deleteButton.click();
      fixture.detectChanges();
      expect(awardOrCertificationFormArrayControls.length).toEqual(1);
      component.removeAwardsAndCertificationsFromFormArrayByIndex(component.resumeForm, 0);
      fixture.detectChanges();
      expect(awardOrCertificationFormArrayControls.length).toEqual(1);
    });

    it('should try to get child form control and return fake object if fails', () => {
      const awardOrCertificationFormArrayControls: AbstractControl[] = component.getResumeAwardsAndCertificationsFormArrayControls(
        component.resumeForm
      );
      expect(
        component.getChildFormControl(awardOrCertificationFormArrayControls[0], 'acquiredDate')
      ).toEqual(awardOrCertificationFormArrayControls[0].get('acquiredDate') as AbstractControl);
    });
  });
});
