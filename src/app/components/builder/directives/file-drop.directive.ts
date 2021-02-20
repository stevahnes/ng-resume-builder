import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {
  @HostBinding('class.file-over') fileOver = false;
  @Output() fileDropped: EventEmitter<File> = new EventEmitter<File>();

  constructor() {}

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    if (event.dataTransfer) {
      this.fileDropped.emit(event.dataTransfer.files[0]);
    }
  }
}
