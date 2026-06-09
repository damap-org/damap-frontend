import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../testing/translate-testing/translate-testing.module';

@Component({
    selector: 'app-cris-tag',
    templateUrl: './cris-tag.component.html',
    styleUrls: ['./cris-tag.component.css'],
    imports: [TranslateModule, TranslatePipeMock],
})
export class CrisTagComponent {
  @Input() cris = null;
}
