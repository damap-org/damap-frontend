import { Component, Input } from '@angular/core';
import { Cost } from '../../../../domain/cost';
import { CostType } from '../../../../domain/enum/cost-type.enum';
import { CurrencyPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../../../testing/translate-testing/translate-testing.module';

@Component({
  selector: 'app-version-view-costs',
  templateUrl: './version-view-costs.component.html',
  styleUrls: [],
  imports: [CurrencyPipe, TranslateModule, TranslatePipeMock],
})
export class VersionViewCostsComponent {
  @Input() costs: Cost[];
  @Input() costsExist: boolean;

  readonly costType = CostType;
}
