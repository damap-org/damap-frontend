import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Dataset } from '../../../../domain/dataset';
import { DataKind } from '../../../../domain/enum/data-kind.enum';
import { DataAccessType } from '../../../../domain/enum/data-access-type.enum';
import { TagComponent } from '../../../../widgets/tag/tag.component';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { BytePipe } from '../../../../pipes/byte/byte.pipe';

@Component({
  selector: 'app-version-view-datasets',
  templateUrl: './version-view-datasets.component.html',
  styleUrls: ['./version-view-datasets.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TagComponent, DatePipe, TranslatePipe, BytePipe],
})
export class VersionViewDatasetsComponent {
  readonly dataKind = input<DataKind>(undefined);
  readonly reusedDataKind = input<DataKind>(undefined);
  readonly dataGeneration = input<string>(undefined);
  readonly noDataExplanation = input<string>(undefined);
  readonly datasets = input<Dataset[]>(undefined);

  readonly dataKindType = DataKind;
  readonly dataAccessType = DataAccessType;
}
