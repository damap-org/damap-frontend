import { NgModule } from '@angular/core';
import { StepIntroComponent } from './step-intro.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule, MatIconModule, MatCardModule],
  declarations: [StepIntroComponent],
  exports: [CommonModule, StepIntroComponent, MatIconModule, MatCardModule],
})
export class StepIntroModule {}
