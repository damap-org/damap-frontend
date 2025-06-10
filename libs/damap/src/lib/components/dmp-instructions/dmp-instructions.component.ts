import { Component, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'damap-dmp-instructions',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  templateUrl: './dmp-instructions.component.html',
  styleUrl: './dmp-instructions.component.css',
})
export class DmpInstructionsComponent {
  readonly panelOpenState = signal(false);

  step = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
  }

  prevStep() {
    this.step.update(i => i - 1);
  }
}
