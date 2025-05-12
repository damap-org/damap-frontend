import { Component, Input } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { AccessRight } from '../../../../domain/enum/access-right.enum';

@Component({
  selector: 'app-data-access',
  templateUrl: './data-access.component.html',
  styleUrls: ['./data-access.component.css'],
  standalone: false,
})
export class DataAccessComponent {
  @Input() dmpForm: UntypedFormGroup;
  @Input() datasets: UntypedFormArray;

  accessRight = AccessRight;
  panelOpenState = false;

  translatePrefixEnum = 'enum.accessright.';
}
