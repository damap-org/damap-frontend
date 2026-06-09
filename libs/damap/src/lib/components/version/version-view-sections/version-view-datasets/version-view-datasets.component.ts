import { Component, Input } from '@angular/core';
import { Dataset } from '../../../../domain/dataset';
import { DataKind } from '../../../../domain/enum/data-kind.enum';
import { DataAccessType } from '../../../../domain/enum/data-access-type.enum';
import { DatePipe } from '@angular/common';
import { TagComponent } from '../../../../widgets/tag/tag.component';
import { TranslateModule } from '@ngx-translate/core';
import { BytePipe } from '../../../../pipes/byte/byte.pipe';
@Component({
    selector: 'app-version-view-datasets',
    templateUrl: './version-view-datasets.component.html',
    styleUrls: ['./version-view-datasets.component.css'],
    imports: [
    TagComponent,
    DatePipe,
    TranslateModule,
    BytePipe
],
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
