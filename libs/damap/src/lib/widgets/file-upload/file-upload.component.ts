import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  standalone: false,
})
export class FileUploadComponent {
  @Input() fileUpload: { file: File; progress: number; finalized: boolean }[];

  @Output() fileToUpload = new EventEmitter<File>();
  @Output() uploadToCancel = new EventEmitter<number>();

  onFileDropped(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.fileToUpload.emit(files.item(i));
    }
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.onFileDropped(event.target.files);
      event.target.value = '';
    }
  }

  cancelUpload(index: number) {
    this.uploadToCancel.emit(index);
  }
}
