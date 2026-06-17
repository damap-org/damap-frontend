import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-save-status',
  templateUrl: './save-status.component.html',
  styleUrls: ['./save-status.component.css'],
  imports: [MatIcon, TranslateDirective],
})
export class SaveStatusComponent {
  @Input() saved: boolean;
}
