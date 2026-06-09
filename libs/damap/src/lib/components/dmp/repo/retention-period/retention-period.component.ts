import { Component, Input } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataSource } from '../../../../domain/enum/data-source.enum';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { InfoMessageComponent } from '../../../../widgets/info-message/info-message.component';

import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-retention-period',
  templateUrl: './retention-period.component.html',
  styleUrls: ['./retention-period.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    InfoMessageComponent,
    MatTooltip,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    TranslateModule,
  ],
})
export class RetentionPeriodComponent {
  @Input() dmpForm: UntypedFormGroup;
  @Input() datasets: UntypedFormArray;

  options: number[] = [10, 25, 100];
  readonly datasetSource: any = DataSource;

  get assignedDatasets(): any[] {
    const assigned: any[] = [];
    const repositories = this.dmpForm.value.repositories;

    if (!repositories || repositories.length === 0 || !this.datasets) {
      return [];
    }

    for (let i = 0; i < this.datasets.length; i++) {
      const dataset = this.datasets.controls[i];
      for (let j = 0; j < repositories.length; j++) {
        const repo = repositories[j];
        if (repo.datasets.includes(dataset.value.referenceHash)) {
          assigned.push(dataset);
          break;
        }
      }
    }
    return assigned;
  }

  truncate(value: string, length: number): string {
    return value.length > length ? value.substring(0, length) + '...' : value;
  }
}
