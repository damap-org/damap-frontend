import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { Project } from '../../../../domain/project';
import { TemplateSelectorService } from '../../../../services/template-selector.service';
import { IdentifierType } from '../../../../domain/enum/identifier-type.enum';

@Component({
  selector: 'app-manual-project-input',
  templateUrl: './manual-project-input.component.html',
  styleUrls: ['./manual-project-input.component.css'],
})
export class ManualProjectInputComponent implements OnChanges, OnInit {
  constructor(private readonly templateService: TemplateSelectorService) {}

  @Input() project: Project;
  @Output() projectUpdate = new EventEmitter<Project>();

  funderTypeObject = [
    IdentifierType.FUNDREF,
    IdentifierType.URL,
    IdentifierType.ROR,
    IdentifierType.ISNI,
    IdentifierType.OTHER,
  ];
  translateEnumPrefix = 'enum.identifier.';

  funderTypeCondition: boolean = false;
  grantTypeCondition: boolean = false;

  grantTypeObject = [IdentifierType.URL, IdentifierType.OTHER];
  translateEnumGrantPrefix = 'enum.identifier.';
  funderOptions: any;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    title: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    description: new UntypedFormControl(''),
    funding: new UntypedFormGroup({
      fundingName: new UntypedFormControl(''),
      funderId: new UntypedFormGroup({
        identifier: new UntypedFormControl(''),
        type: new UntypedFormControl(''),
      }),
      grantId: new UntypedFormGroup({
        identifier: new UntypedFormControl(''),
        type: new UntypedFormControl(''),
      }),
    }),
    start: new UntypedFormControl(null),
    end: new UntypedFormControl(null),
    acronym: new UntypedFormControl('', [Validators.maxLength(255)]),
  });

  ngOnInit(): void {
    this.funderOptions = this.templateService.fundersid();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project && !this.project?.universityId) {
      this.form.patchValue(this.project);
    }
  }

  updateProject(): void {
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

  get funder(): UntypedFormControl {
    return this.form
      .get('funding')
      .get('funderId')
      .get('identifier') as UntypedFormControl;
  }

  get funderType(): UntypedFormControl {
    return this.form
      .get('funding')
      .get('funderId')
      .get('type') as UntypedFormControl;
  }

  get grant(): UntypedFormControl {
    return this.form
      .get('funding')
      .get('grantId')
      .get('identifier') as UntypedFormControl;
  }

  get grantType(): UntypedFormControl {
    return this.form.get('grantType') as UntypedFormControl;
  }

  selectOptionFunderId(value) {
    this.form
      .get('funding')
      .get('funderId')
      .get('type')
      .setValue(this.templateService.typeOfId(value));
    this.checkValidators();
  }

  checkValidators() {
    this.validatorField('funderId');
    this.validatorField('grantId');
  }

  validatorField(field: string) {
    const validator = this.form.get('funding').get(field).get('type');
    if (
      this.form.get('funding').get(field).get('identifier').value !== null &&
      this.form.get('funding').get(field).get('identifier').value != ''
    ) {
      validator?.setValidators([Validators.required]);
    } else {
      validator?.clearValidators();
      validator.setValue('');
    }
    validator?.updateValueAndValidity();
  }
}
