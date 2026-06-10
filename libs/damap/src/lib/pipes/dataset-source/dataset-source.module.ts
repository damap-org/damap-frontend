import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetSourcePipe } from './dataset-source.pipe';

@NgModule({
  exports: [DatasetSourcePipe],
  imports: [CommonModule, DatasetSourcePipe],
})
export class DatasetSourceModule {}
