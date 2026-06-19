import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InfoBoxDetails } from '../domain/infoBox-details';

const STEP_KEYS: Record<number, string> = {
  0: 'dmp.steps.project',
  1: 'dmp.steps.people',
  2: 'dmp.steps.data.specify',
  3: 'dmp.steps.documentation',
  4: 'dmp.steps.storage',
  5: 'dmp.steps.legal',
  6: 'dmp.steps.licensing',
  7: 'dmp.steps.repositories',
  8: 'dmp.steps.data.reuse',
  9: 'dmp.steps.costs',
  10: 'dmp.steps.end',
};

@Injectable({
  providedIn: 'root',
})
export class InfoLabelService {
  private translate = inject(TranslateService);

  getInfo(index: number): InfoBoxDetails {
    const prefix = STEP_KEYS[index] ?? STEP_KEYS[0];
    return {
      greeting: this.translate.instant(`${prefix}.greeting`),
      summaryLine: this.translate.instant(`${prefix}.summaryLine`),
      instructions: this.translate.instant(`${prefix}.instructions`),
      stepNumber: index < 1 || index > 11 ? 1 : index + 1,
    };
  }
}
