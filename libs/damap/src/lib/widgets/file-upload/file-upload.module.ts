import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragdropDirective } from './dragdrop.directive';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // Materials
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    FileUploadComponent,
    DragdropDirective,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FileUploadComponent,
    DragdropDirective,
    // Materials
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
})
export class FileUploadModule {}
