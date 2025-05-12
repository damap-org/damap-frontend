import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { CostType } from '../../../domain/enum/cost-type.enum';

@Component({
  selector: 'app-dmp-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css'],
  standalone: false,
})
export class CostsComponent {
  @Input() costsStep: UntypedFormGroup;

  @Output() costToAdd = new EventEmitter();
  @Output() costToRemove = new EventEmitter<number>();

  costType: any = CostType;
  costTypeObject = Object.values(CostType);

  translateEnumPrefix = 'enum.costs.';

  get list() {
    return this.costsStep?.get('list') as UntypedFormArray;
  }

  getFormControl(index: number, controlName: string): UntypedFormControl {
    return (this.list.at(index) as UntypedFormGroup)?.controls[
      controlName
    ] as UntypedFormControl;
  }

  addCost() {
    this.costToAdd.emit();
  }

  removeCost(index: number) {
    this.costToRemove.emit(index);
  }
}
