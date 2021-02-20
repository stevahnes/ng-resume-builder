import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileDropDirective } from './file-drop.directive';

@Component({ template: `<input type="file" appFileDrop />` })
class TestFileDropComponent {}

describe('FileDropDirective', () => {
  let fixture: ComponentFixture<TestFileDropComponent>;
  let inputEl: HTMLInputElement;
  let directive: FileDropDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestFileDropComponent, FileDropDirective]
    });
    fixture = TestBed.createComponent(TestFileDropComponent);
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    const directiveDebugElement = fixture.debugElement.query(By.directive(FileDropDirective));
    directive = directiveDebugElement.injector.get(FileDropDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should detect dragover event and mark fileOver as true', () => {
    inputEl.dispatchEvent(new DragEvent('dragover', undefined));
    fixture.detectChanges();
    expect(directive.fileOver).toBeTrue();
    expect(inputEl.classList.value).toEqual('file-over');
  });

  it('should detect dragleave event and mark fileOver as false', () => {
    inputEl.dispatchEvent(new DragEvent('dragleave', undefined));
    fixture.detectChanges();
    expect(directive.fileOver).toBeFalse();
    expect(inputEl.classList.value).toEqual('');
  });

  it('should detect drop event, mark fileOver as false, and emit dropped file', () => {
    spyOn(directive.fileDropped, 'emit');
    const FILE_NAME = 'dummy.txt';
    const dataTransfer = new DataTransfer();
    const file = new File([''], FILE_NAME);
    dataTransfer.items.add(file);
    inputEl.dispatchEvent(new DragEvent('drop', { dataTransfer }));
    fixture.detectChanges();
    expect(directive.fileOver).toBeFalse();
    expect(inputEl.classList.value).toEqual('');
    expect(directive.fileDropped.emit).toHaveBeenCalledOnceWith(file);
  });
});
