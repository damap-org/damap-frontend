import { Component, Input } from '@angular/core';
import { Dataset } from '../../../../domain/dataset';
import { FormService } from '../../../../services/form.service';

@Component({
  selector: 'app-version-view-reuse',
  templateUrl: './version-view-reuse.component.html',
  styleUrls: [],
  standalone: false,
})
export class VersionViewReuseComponent {
  @Input() targetAudience: string;
  @Input() tools: string;
  @Input() restrictedDataAccess: string;
  @Input() restrictedAccessInfo: string;
  @Input() closedAccessInfo: string;
  @Input() datasets: Dataset[];

  get hasRestrictedDatasets(): boolean {
    return this.datasets
      ? FormService.restrictedDatasets(this.datasets)
      : false;
  }

  get hasClosedDatasets(): boolean {
    return this.datasets ? FormService.closedDatasets(this.datasets) : false;
  }
}
