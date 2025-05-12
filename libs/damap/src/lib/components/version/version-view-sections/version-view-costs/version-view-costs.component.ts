import { Component, Input } from '@angular/core';
import { Cost } from '../../../../domain/cost';
import { CostType } from '../../../../domain/enum/cost-type.enum';

@Component({
  selector: 'app-version-view-costs',
  templateUrl: './version-view-costs.component.html',
  styleUrls: [],
  standalone: false,
})
export class VersionViewCostsComponent {
  @Input() costs: Cost[];
  @Input() costsExist: boolean;

  readonly costType = CostType;
}
