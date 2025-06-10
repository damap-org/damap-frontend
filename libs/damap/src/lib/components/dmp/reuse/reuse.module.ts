import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReuseComponent } from './reuse.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StepIntroModule,

    // Materials
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    SharedModule,
  ],
  declarations: [ReuseComponent],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StepIntroModule,

    ReuseComponent,

    // Materials
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
})
export class ReuseModule {}
