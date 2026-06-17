import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cris-tag',
  templateUrl: './cris-tag.component.html',
  styleUrls: ['./cris-tag.component.css'],
  imports: [TranslatePipe],
})
export class CrisTagComponent {
  @Input() cris = null;
}
