import { Component, Input } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { DataSource } from '../../../../domain/enum/data-source.enum';

@Component({
  selector: 'app-retention-period',
  templateUrl: './retention-period.component.html',
  styleUrls: ['./retention-period.component.css'],
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
