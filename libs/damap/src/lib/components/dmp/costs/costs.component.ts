import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { CostType } from '../../../domain/enum/cost-type.enum';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { InfoMessageComponent } from '../../../widgets/info-message/info-message.component';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { CrisTagComponent } from '../../../widgets/cris-tag/cris-tag.component';
import { CurrencyPipe, KeyValuePipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
  MatExpansionPanelDescription,
} from '@angular/material/expansion';
import { InputWrapperComponent } from '../../../shared/input-wrapper/input-wrapper.component';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { TextareaWrapperComponent } from '../../../shared/textarea-wrapper/textarea-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-dmp-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css'],
  imports: [
    MatLabel,
    MatCard,
    MatCardContent,
    InfoMessageComponent,
    FormsModule,
    ReactiveFormsModule,
    MatRadioGroup,
    CrisTagComponent,
    MatRadioButton,
    MatButton,
    MatIcon,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatIconButton,
    InputWrapperComponent,
    MatFormField,
    MatSelect,
    MatOption,
    TextareaWrapperComponent,
    CurrencyPipe,
    KeyValuePipe,
    TranslateModule,
  ],
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
