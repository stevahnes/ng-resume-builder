import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Cursor } from './class';
import { EMPTY_RESUME } from './constants';
import { AwardsAndCertification, Education, Resume, Work } from './models';
import { ResumeFormService } from './services/resume-form.service';
import { OnePageStandard } from './templates/one-page-standard/constants/one-page-standard.constants';
import { generateOnePageStandardPDF } from './templates/one-page-standard/logic/core.logic';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  constructor(private readonly formService: ResumeFormService) {}

  public uploadedFileName = '';
  public processingFile = false;
  public parseError = false;
  public displayFormEditor = false;
  private resume: Resume = EMPTY_RESUME;
  public resumeForm: FormGroup = this.formService.buildResumeForm();

  ngOnInit(): void {}

  onFileDropped(event: File): void {
    this.processFile(event);
  }

  onFileAdded(event: Event): void {
    if (event.target) {
      const fileInputElement: HTMLInputElement = event.target as HTMLInputElement;
      if (fileInputElement.files) {
        const file: File = fileInputElement.files[0];
        this.processFile(file);
      }
    }
  }

  applyCreateFromScratch(): void {
    this.resumeForm = this.formService.buildResumeForm();
    this.resume = EMPTY_RESUME;
    this.uploadedFileName = '';
    this.setDisplayFormEditor(true);
  }

  setDisplayFormEditor(value: boolean): void {
    this.displayFormEditor = value;
  }

  save(): void {
    this.updateResume(this.resume, this.resumeForm);
    const resumeBlob = new Blob([JSON.stringify(this.resume)], {
      type: 'text/plain;charset=utf-8'
    });
    saveAs(resumeBlob, 'resume.txt');
  }

  generatePDF(): void {
    this.updateResume(this.resume, this.resumeForm);
    const onePagePDF = new jsPDF(
      OnePageStandard.ORIENTATION,
      OnePageStandard.UNIT,
      OnePageStandard.FORMAT
    );
    const onePageCursor = new Cursor(0, 0, OnePageStandard.HEADER_FONT_SIZE);
    generateOnePageStandardPDF(this.resume, onePagePDF, onePageCursor);
  }

  private processFile(file: File): void {
    this.parseError = false;
    this.processingFile = true;
    this.uploadedFileName = file.name;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileContent: string = fileReader.result as string;
      if (fileContent) {
        this.parseFileContent(fileContent);
      }
    };
    fileReader.readAsText(file);
  }

  private parseFileContent(fileContent: string): void {
    try {
      this.resume = JSON.parse(fileContent);
      this.resumeForm = this.formService.buildResumeForm(true);
      this.setHeaderResumeForm(this.resumeForm, this.resume);
      (this.resumeForm.get('profile') as AbstractControl).setValue(this.resume.profile);
      (this.resumeForm.get('competencies') as AbstractControl).setValue([
        ...this.resume.competencies
      ]);
      this.setWorkResumeForm(this.resumeForm, this.resume);
      this.setEducationResumeForm(this.resumeForm, this.resume);
      this.setAwardsAndCertificationsResumeForm(this.resumeForm, this.resume);
      this.resumeForm.updateValueAndValidity();
      this.displayFormEditor = true;
      this.processingFile = false;
    } catch (error) {
      this.parseError = true;
    }
  }

  private setHeaderResumeForm(resumeForm: FormGroup, resume: Resume): void {
    (resumeForm.get('header.name') as AbstractControl).setValue(resume.header.name);
    (resumeForm.get('header.subtitle') as AbstractControl).setValue(resume.header.subtitle);
    (resumeForm.get('header.email') as AbstractControl).setValue(resume.header.email);
    (resumeForm.get('header.phone') as AbstractControl).setValue(resume.header.phone);
    (resumeForm.get('header.leftDetail') as AbstractControl).setValue(resume.header.leftDetail);
    (resumeForm.get('header.rightDetail') as AbstractControl).setValue(resume.header.rightDetail);
  }

  private setWorkResumeForm(resumeForm: FormGroup, resume: Resume): void {
    resume.work.forEach((work) => {
      const workForm: FormGroup = this.formService.buildWorkForm(true);
      (workForm.get('company') as AbstractControl).setValue(work.company);
      (workForm.get('location') as AbstractControl).setValue(work.location);
      for (const [index, designation] of work.designations.entries()) {
        if (index < 1) {
          (workForm.get('designations') as FormArray).push(
            this.formService.buildGenericControl(designation, true)
          );
        } else {
          (workForm.get('designations') as FormArray).push(
            this.formService.buildGenericControl(designation)
          );
        }
      }
      for (const period of work.periods) {
        const periodForm: FormGroup = this.formService.buildPeriodForm();
        (periodForm.get('start') as AbstractControl).setValue(period.start);
        (periodForm.get('end') as AbstractControl).setValue(period.end);
        (workForm.get('periods') as FormArray).push(periodForm);
      }
      for (const [index, description] of work.descriptions.entries()) {
        if (index < 1) {
          (workForm.get('descriptions') as FormArray).push(
            this.formService.buildGenericControl(description, true)
          );
        } else {
          (workForm.get('descriptions') as FormArray).push(
            this.formService.buildGenericControl(description)
          );
        }
      }
      (resumeForm.get('work') as FormArray).push(workForm);
    });
  }

  private setEducationResumeForm(resumeForm: FormGroup, resume: Resume): void {
    resume.education.forEach((education) => {
      const educationForm: FormGroup = this.formService.buildEducationForm(true);
      (educationForm.get('institution') as AbstractControl).setValue(education.institution);
      for (const [index, qualification] of education.qualification.entries()) {
        if (index < 1) {
          (educationForm.get('qualification') as FormArray).push(
            this.formService.buildGenericControl(qualification, true)
          );
        } else {
          (educationForm.get('qualification') as FormArray).push(
            this.formService.buildGenericControl(qualification)
          );
        }
      }
      (educationForm.get('period') as AbstractControl).setValue({
        start: education.period.start,
        end: education.period.end
      });
      (educationForm.get('honorsAndGrade') as AbstractControl).setValue(education.honorsAndGrade);
      (resumeForm.get('education') as FormArray).push(educationForm);
    });
  }

  private setAwardsAndCertificationsResumeForm(resumeForm: FormGroup, resume: Resume): void {
    resume.awardsAndCertifications.forEach((awardsAndCertifications) => {
      const awardsAndCertificationsForm: FormGroup = this.formService.buildAwardsAndCertificationsForm();
      (awardsAndCertificationsForm.get('name') as AbstractControl).setValue(
        awardsAndCertifications.name
      );
      (awardsAndCertificationsForm.get('acquiredDate') as AbstractControl).setValue(
        awardsAndCertifications.acquiredDate
      );
      (resumeForm.get('awardsAndCertifications') as FormArray).push(awardsAndCertificationsForm);
    });
  }

  private updateResume(resume: Resume, resumeForm: FormGroup): void {
    this.updateResumeHeader(resume, resumeForm);
    resume.profile = (this.resumeForm.get('profile') as AbstractControl).value;
    resume.competencies = [...(this.resumeForm.get('competencies') as AbstractControl).value];
    this.updateResumeWork(resume, resumeForm);
    this.updateResumeEducation(resume, resumeForm);
    this.updateResumeAwardsAndCertifications(resume, resumeForm);
  }

  private updateResumeHeader(resume: Resume, resumeForm: FormGroup): void {
    resume.header.name = (resumeForm.get('header.name') as AbstractControl).value;
    resume.header.subtitle = (resumeForm.get('header.subtitle') as AbstractControl).value;
    resume.header.email = (resumeForm.get('header.email') as AbstractControl).value;
    resume.header.phone = (resumeForm.get('header.phone') as AbstractControl).value;
    resume.header.leftDetail = (resumeForm.get('header.leftDetail') as AbstractControl).value;
    resume.header.rightDetail = (resumeForm.get('header.rightDetail') as AbstractControl).value;
  }

  private updateResumeWork(resume: Resume, resumeForm: FormGroup): void {
    const workFormArrayValues: Work[] = this.formService.getResumeWorkFormArray(resumeForm).value;
    resume.work = [...workFormArrayValues];
  }

  private updateResumeEducation(resume: Resume, resumeForm: FormGroup): void {
    const educationFormArrayValues: Education[] = this.formService.getResumeEducationFormArray(
      resumeForm
    ).value;
    resume.education = [...educationFormArrayValues];
  }

  private updateResumeAwardsAndCertifications(resume: Resume, resumeForm: FormGroup): void {
    const awardsAndCertificationsFormArrayValues: AwardsAndCertification[] = this.formService.getResumeAwardsAndCertificationsFormArray(
      resumeForm
    ).value;
    resume.awardsAndCertifications = [...awardsAndCertificationsFormArrayValues];
  }
}
