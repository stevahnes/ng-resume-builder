import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ResumeFormService {
  constructor(private readonly formBuilder: FormBuilder) {}

  buildResumeForm(loadData = false): FormGroup {
    if (loadData) {
      return this.formBuilder.group({
        header: this.buildHeaderForm(),
        profile: ['', [Validators.required]],
        competencies: [[], [Validators.required]],
        work: this.formBuilder.array([]),
        education: this.formBuilder.array([]),
        awardsAndCertifications: this.formBuilder.array([])
      });
    }
    return this.formBuilder.group({
      header: this.buildHeaderForm(),
      profile: ['', [Validators.required]],
      competencies: [[], [Validators.required]],
      work: this.formBuilder.array([this.buildWorkForm()]),
      education: this.formBuilder.array([this.buildEducationForm()]),
      awardsAndCertifications: this.formBuilder.array([this.buildAwardsAndCertificationsForm()])
    });
  }

  buildHeaderForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      leftDetail: [''],
      rightDetail: ['']
    });
  }

  buildWorkForm(loadData = false): FormGroup {
    if (loadData) {
      return this.formBuilder.group({
        company: ['', [Validators.required]],
        location: ['', [Validators.required]],
        designations: this.formBuilder.array([]),
        periods: this.formBuilder.array([]),
        descriptions: this.formBuilder.array([])
      });
    }
    return this.formBuilder.group({
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      designations: this.formBuilder.array([['', Validators.required]]),
      periods: this.formBuilder.array([this.buildPeriodForm()]),
      descriptions: this.formBuilder.array([['', Validators.required]])
    });
  }

  buildEducationForm(loadData = false): FormGroup {
    if (loadData) {
      return this.formBuilder.group({
        institution: ['', [Validators.required]],
        qualification: this.formBuilder.array([]),
        period: this.buildPeriodForm(),
        honorsAndGrade: ['']
      });
    }
    return this.formBuilder.group({
      institution: ['', [Validators.required]],
      qualification: this.formBuilder.array([['', Validators.required]]),
      period: this.buildPeriodForm(),
      honorsAndGrade: ['']
    });
  }

  buildAwardsAndCertificationsForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      acquiredDate: ['', [Validators.required]]
    });
  }

  buildPeriodForm(): FormGroup {
    return this.formBuilder.group({
      start: ['', [Validators.required]],
      end: ['']
    });
  }

  buildGenericControl(value: string | string[], isRequired = false): FormControl {
    if (isRequired) {
      return this.formBuilder.control(value, Validators.required);
    }
    return this.formBuilder.control(value);
  }

  getResumeHeaderFormGroup(resumeForm: AbstractControl): FormGroup {
    return resumeForm.get('header') as FormGroup;
  }

  getResumeWorkFormArray(resumeForm: AbstractControl): FormArray {
    return resumeForm.get('work') as FormArray;
  }

  getResumeEducationFormArray(resumeForm: AbstractControl): FormArray {
    return resumeForm.get('education') as FormArray;
  }

  getResumeAwardsAndCertificationsFormArray(resumeForm: AbstractControl): FormArray {
    return resumeForm.get('awardsAndCertifications') as FormArray;
  }

  getWorkDesignationFormArray(workForm: AbstractControl): FormArray {
    return workForm.get('designations') as FormArray;
  }

  getWorkPeriodsFormArray(workForm: AbstractControl): FormArray {
    return workForm.get('periods') as FormArray;
  }

  getWorkDescriptionsFormArray(workForm: AbstractControl): FormArray {
    return workForm.get('descriptions') as FormArray;
  }

  getEducationQualificationFormArray(educationForm: AbstractControl): FormArray {
    return educationForm.get('qualification') as FormArray;
  }
}
