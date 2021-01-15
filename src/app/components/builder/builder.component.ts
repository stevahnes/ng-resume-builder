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

  private resume: Resume = EMPTY_RESUME;

  ngOnInit(): void {}

  onFileAdded(event: Event): void {
    if (event.target) {
      const fileInputElement: HTMLInputElement = event.target as HTMLInputElement;
      if (fileInputElement.files) {
        const file: File = fileInputElement.files[0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const fileContent: string = fileReader.result as string;
          this.resume = JSON.parse(fileContent);
        };
        fileReader.readAsText(file);
      }
    }
  }

  generatePDF = () => generateOnePageStandardPDF(this.resume, onePagePDF, onePageCursor);
}
