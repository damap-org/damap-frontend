import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { Project } from '../../../../domain/project';
import { FeedbackService } from '../../../../services/feedback.service';
import {
  MatLabel,
  MatFormField,
  MatHint,
  MatSuffix,
} from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { InputWrapperComponent } from '../../../../shared/input-wrapper/input-wrapper.component';
import {
  MatDateRangeInput,
  MatStartDate,
  MatEndDate,
  MatDatepickerToggle,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { TextareaWrapperComponent } from '../../../../shared/textarea-wrapper/textarea-wrapper.component';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-manual-project-input',
  templateUrl: './manual-project-input.component.html',
  styleUrls: ['./manual-project-input.component.css'],
  imports: [
    MatLabel,
    MatCard,
    MatCardContent,
    FormsModule,
    InputWrapperComponent,
    MatFormField,
    MatDateRangeInput,
    ReactiveFormsModule,
    MatStartDate,
    MatEndDate,
    MatHint,
    MatDatepickerToggle,
    MatSuffix,
    MatDateRangePicker,
    TextareaWrapperComponent,
    MatButton,
    TranslatePipe,
  ],
})
export class ManualProjectInputComponent implements OnChanges {
  private feedbackService = inject(FeedbackService);

  @Input() project: Project;
  @Output() projectUpdate = new EventEmitter<Project>();

  form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    title: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    description: new UntypedFormControl(''),
    start: new UntypedFormControl(null),
    end: new UntypedFormControl(null),
    acronym: new UntypedFormControl('', [Validators.maxLength(255)]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project && !this.project?.universityId) {
      this.form.patchValue(this.project);
    }
  }

  updateProject(): void {
    if (this.project !== null) {
      this.feedbackService.success('dmp.steps.project.success');
    }
    const project = this.form.getRawValue();
    this.projectUpdate.emit(project);
  }

  get title(): UntypedFormControl {
    return this.form.get('title') as UntypedFormControl;
  }

  get acronym(): UntypedFormControl {
    return this.form.get('acronym') as UntypedFormControl;
  }

  get description(): UntypedFormControl {
    return this.form.get('description') as UntypedFormControl;
  }
}
