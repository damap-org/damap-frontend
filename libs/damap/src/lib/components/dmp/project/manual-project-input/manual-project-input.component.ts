import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { Project } from '../../../../domain/project';
import { FeedbackService } from '../../../../services/feedback.service';

@Component({
  selector: 'app-manual-project-input',
  templateUrl: './manual-project-input.component.html',
  styleUrls: ['./manual-project-input.component.css'],
})
export class ManualProjectInputComponent implements OnChanges {
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

  constructor(private feedbackService: FeedbackService) {}

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
