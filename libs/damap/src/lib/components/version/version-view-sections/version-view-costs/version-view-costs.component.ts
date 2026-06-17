import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Cost } from '../../../../domain/cost';
import { CostType } from '../../../../domain/enum/cost-type.enum';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-version-view-costs',
  templateUrl: './version-view-costs.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CurrencyPipe, TranslatePipe],
})
export class VersionViewCostsComponent {
  @Input() costs: Cost[];
  @Input() costsExist: boolean;

  readonly costType = CostType;
}
