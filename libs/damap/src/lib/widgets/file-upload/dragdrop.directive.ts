import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDragdrop]',
  standalone: false,
})
export class DragdropDirective {
  @HostBinding('class.fileover') fileOver: boolean;

  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event'])
  public onDragOver(event) {
    event.preventDefault(); // Prevent file from being opened
    event.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  public onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
