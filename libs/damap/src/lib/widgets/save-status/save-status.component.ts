import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-save-status',
  templateUrl: './save-status.component.html',
  styleUrls: ['./save-status.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatIcon, TranslateDirective],
})
export class SaveStatusComponent {
  readonly saved = input<boolean>(undefined);
}
