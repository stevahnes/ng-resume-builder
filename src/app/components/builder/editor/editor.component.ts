import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { ResumeFormService } from '../services/resume-form.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() resumeForm: FormGroup = this.formService.buildResumeForm();

  constructor(private formService: ResumeFormService) {}

  ngOnInit(): void {}

  getResumeHeaderFormGroup(resumeForm: AbstractControl): FormGroup {
    return this.formService.getResumeHeaderFormGroup(resumeForm);
  }

  getResumeWorkFormArrayControls(resumeForm: AbstractControl): AbstractControl[] {
    return this.formService.getResumeWorkFormArray(resumeForm).controls;
  }

  addWorkToFormArray(resumeForm: AbstractControl): void {
    this.formService.getResumeWorkFormArray(resumeForm).push(this.formService.buildWorkForm());
  }

  removeWorkFromFormArrayByIndex(resumeForm: AbstractControl, index: number): void {
    const formArray: FormArray = this.formService.getResumeWorkFormArray(resumeForm);
    if (formArray.controls.length > 1) {
      formArray.removeAt(index);
    }
  }

  getResumeEducationFormArrayControls(resumeForm: AbstractControl): AbstractControl[] {
    return this.formService.getResumeEducationFormArray(resumeForm).controls;
  }

  addEducationToFormArray(resumeForm: AbstractControl): void {
    this.formService
      .getResumeEducationFormArray(resumeForm)
      .push(this.formService.buildEducationForm());
  }

  removeEducationFromFormArrayByIndex(resumeForm: AbstractControl, index: number): void {
    const formArray: FormArray = this.formService.getResumeEducationFormArray(resumeForm);
    if (formArray.controls.length > 1) {
      formArray.removeAt(index);
    }
  }

  getResumeAwardsAndCertificationsFormArrayControls(
    resumeForm: AbstractControl
  ): AbstractControl[] {
    return this.formService.getResumeAwardsAndCertificationsFormArray(resumeForm).controls;
  }

  addAwardsAndCertificationsToFormArray(resumeForm: AbstractControl): void {
    this.formService
      .getResumeAwardsAndCertificationsFormArray(resumeForm)
      .push(this.formService.buildAwardsAndCertificationsForm());
  }

  removeAwardsAndCertificationsFromFormArrayByIndex(
    resumeForm: AbstractControl,
    index: number
  ): void {
    const formArray: FormArray = this.formService.getResumeAwardsAndCertificationsFormArray(
      resumeForm
    );
    if (formArray.controls.length > 1) {
      formArray.removeAt(index);
    }
  }

  getWorkDesignationFormArrayControls(workForm: AbstractControl): AbstractControl[] {
    return this.formService.getWorkDesignationFormArray(workForm).controls;
  }

  getWorkPeriodsFormArrayControls(workForm: AbstractControl): AbstractControl[] {
    return this.formService.getWorkPeriodsFormArray(workForm).controls;
  }

  getWorkDescriptionsFormArrayControls(workForm: AbstractControl): AbstractControl[] {
    return this.formService.getWorkDescriptionsFormArray(workForm).controls;
  }

  addWorkDescriptionToFormArray(workForm: AbstractControl): void {
    this.formService
      .getWorkDescriptionsFormArray(workForm)
      .push(this.formService.buildGenericControl(''));
  }

  removeWorkDescriptionFromFormArray(workForm: AbstractControl, index: number): void {
    const formArray: FormArray = this.formService.getWorkDescriptionsFormArray(workForm);
    if (formArray.controls.length > 1) {
      formArray.removeAt(index);
    }
  }

  getEducationQualificationFormArrayControls(educationForm: AbstractControl): AbstractControl[] {
    return this.formService.getEducationQualificationFormArray(educationForm).controls;
  }
}
