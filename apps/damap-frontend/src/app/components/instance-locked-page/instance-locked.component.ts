import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-instance-locked',
  templateUrl: './instance-locked.component.html',
  styleUrls: ['./instance-locked.component.scss'],
  imports: [TranslateModule, MatIconModule],
  standalone: true,
})
export class InstanceLockedComponent {
  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang') ?? 'en';
    if (!this.translate.currentLang) {
      this.translate.use(lang);
    }
  }
}
