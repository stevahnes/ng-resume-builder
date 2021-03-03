import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
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

  getResumeEducationFormArrayControls(resumeForm: AbstractControl): AbstractControl[] {
    return this.formService.getResumeEducationFormArray(resumeForm).controls;
  }

  getResumeAwardsAndCertificationsFormArrayControls(
    resumeForm: AbstractControl
  ): AbstractControl[] {
    return this.formService.getResumeAwardsAndCertificationsFormArray(resumeForm).controls;
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

  getEducationQualificationFormArrayControls(educationForm: AbstractControl): AbstractControl[] {
    return this.formService.getEducationQualificationFormArray(educationForm).controls;
  }
}
