import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResumeFormService } from './resume-form.service';

describe('ResumeFormService', () => {
  let service: ResumeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule]
    });
    service = TestBed.inject(ResumeFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
