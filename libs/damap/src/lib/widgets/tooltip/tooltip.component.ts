import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../testing/translate-testing/translate-testing.module';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
  imports: [MatIcon, MatTooltip, TranslateModule, TranslatePipeMock],
})
export class TooltipComponent {
  @Input() tooltip: string;
}
