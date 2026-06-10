import { NgModule } from '@angular/core';
import { OrcidComponent } from './orcid.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, OrcidComponent],
  exports: [CommonModule, OrcidComponent],
})
export class OrcidModule {}
