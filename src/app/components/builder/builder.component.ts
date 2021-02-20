import { Component, OnInit } from '@angular/core';
import { EMPTY_RESUME } from './constants';
import { Resume } from './models';
import {
  onePageCursor,
  onePagePDF
} from './templates/one-page-standard/constants/one-page-standard.constants';
import { generateOnePageStandardPDF } from './templates/one-page-standard/logic/core.logic';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  constructor() {}

  public uploadedFileName = '';
  public processingFile = false;
  public parseError = false;
  private resume: Resume = EMPTY_RESUME;

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

  generatePDF = () => generateOnePageStandardPDF(this.resume, onePagePDF, onePageCursor);

  private processFile(file: File): void {
    this.parseError = false;
    this.processingFile = true;
    this.uploadedFileName = file.name;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileContent: string = fileReader.result as string;
      if (fileContent) {
        try {
          this.resume = JSON.parse(fileContent);
          this.processingFile = false;
        } catch (error) {
          this.parseError = true;
        }
      }
    };
    fileReader.readAsText(file);
  }
}
