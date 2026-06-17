import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-instance-locked',
  templateUrl: './instance-locked.component.html',
  styleUrls: ['./instance-locked.component.scss'],
  imports: [TranslatePipe, MatIconModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class InstanceLockedComponent {
  private translate = inject(TranslateService);

  constructor() {
    const lang = localStorage.getItem('lang') ?? 'en';
    if (!this.translate.getCurrentLang()) {
      this.translate.use(lang);
    }
  }
}
