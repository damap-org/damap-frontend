import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
  imports: [MatIcon, TranslateModule],
})
export class ErrorMessageComponent {
  @Input() message: string;
  @Input() data: any;
}
