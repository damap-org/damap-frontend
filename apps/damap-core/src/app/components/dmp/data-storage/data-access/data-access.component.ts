import { Component, Input, ChangeDetectionStrategy, input } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AccessRight } from '../../../../domain/enum/access-right.enum';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { KeyValuePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-data-access',
  templateUrl: './data-access.component.html',
  styleUrls: ['./data-access.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatLabel,
    MatCard,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    KeyValuePipe,
    TranslatePipe,
  ],
})
export class DataAccessComponent {
  readonly dmpForm = input<UntypedFormGroup>(undefined);
  @Input() datasets: UntypedFormArray;

  accessRight = AccessRight;
  panelOpenState = false;

  translatePrefixEnum = 'enum.accessright.';
}
