import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Dataset } from '../../../../domain/dataset';
import { FormService } from '../../../../services/form.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-version-view-reuse',
  templateUrl: './version-view-reuse.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslatePipe],
})
export class VersionViewReuseComponent {
  readonly targetAudience = input<string>(undefined);
  readonly tools = input<string>(undefined);
  readonly restrictedDataAccess = input<string>(undefined);
  readonly restrictedAccessInfo = input<string>(undefined);
  readonly closedAccessInfo = input<string>(undefined);
  readonly datasets = input<Dataset[]>(undefined);

  get hasRestrictedDatasets(): boolean {
    const datasets = this.datasets();
    return datasets ? FormService.restrictedDatasets(datasets) : false;
  }

  get hasClosedDatasets(): boolean {
    const datasets = this.datasets();
    return datasets ? FormService.closedDatasets(datasets) : false;
  }
}
