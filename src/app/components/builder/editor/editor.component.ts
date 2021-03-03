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
  headerForm: FormGroup = this.resumeForm.get('header') as FormGroup;

  constructor(private formService: ResumeFormService) {}

  ngOnInit(): void {}

  getResumeWorkFormArrayControls(resumeForm: AbstractControl): AbstractControl[] {
    return (resumeForm.get('work') as FormArray).controls;
  }

  getResumeEducationFormArrayControls(resumeForm: AbstractControl): AbstractControl[] {
    return (resumeForm.get('education') as FormArray).controls;
  }

  getResumeAwardsAndCertificationsFormArrayControls(
    resumeForm: AbstractControl
  ): AbstractControl[] {
    return (resumeForm.get('awardsAndCertifications') as FormArray).controls;
  }

  getWorkDesignationFormArrayControls(workForm: AbstractControl): AbstractControl[] {
    return (workForm.get('designations') as FormArray).controls;
  }

  getWorkPeriodsFormArrayControls(workForm: AbstractControl): AbstractControl[] {
    return (workForm.get('periods') as FormArray).controls;
  }

  getWorkDescriptionsFormArrayControls(workForm: AbstractControl): AbstractControl[] {
    return (workForm.get('descriptions') as FormArray).controls;
  }

  getEducationQualificationFormArrayControls(educationForm: AbstractControl): AbstractControl[] {
    return (educationForm.get('qualification') as FormArray).controls;
  }
}
