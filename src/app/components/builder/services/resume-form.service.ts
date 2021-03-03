import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ResumeFormService {
  constructor(private readonly formBuilder: FormBuilder) {}

  buildResumeForm(): FormGroup {
    return this.formBuilder.group({
      header: this.buildHeaderForm(),
      profile: ['', [Validators.required, Validators.maxLength(500)]],
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
      leftDetail: ['', [Validators.required]],
      rightDetail: ['', [Validators.required]]
    });
  }

  buildWorkForm(): FormGroup {
    return this.formBuilder.group({
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      designations: this.formBuilder.array([['', Validators.required]]),
      periods: this.formBuilder.array([this.buildPeriodForm()]),
      descriptions: this.formBuilder.array([['', Validators.required]])
    });
  }

  buildEducationForm(): FormGroup {
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
}
