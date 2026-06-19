import {
  Component,
  Input,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatIcon, TranslatePipe],
})
export class ErrorMessageComponent {
  readonly message = input<string>(undefined);
  @Input() data: any;
}
