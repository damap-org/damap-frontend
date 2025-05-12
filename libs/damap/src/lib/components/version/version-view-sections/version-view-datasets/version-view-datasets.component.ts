import { Component, Input } from '@angular/core';
import { Dataset } from '../../../../domain/dataset';
import { DataKind } from '../../../../domain/enum/data-kind.enum';
import { DataAccessType } from '../../../../domain/enum/data-access-type.enum';

@Component({
  selector: 'app-version-view-datasets',
  templateUrl: './version-view-datasets.component.html',
  styleUrls: ['./version-view-datasets.component.css'],
  standalone: false,
})
export class VersionViewDatasetsComponent {
  @Input() dataKind: DataKind;
  @Input() reusedDataKind: DataKind;
  @Input() dataGeneration: string;
  @Input() noDataExplanation: string;
  @Input() datasets: Dataset[];

  readonly dataKindType = DataKind;
  readonly dataAccessType = DataAccessType;
}
