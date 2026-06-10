import { Component, Input } from '@angular/core';
import { Dmp } from '../../../../domain/dmp';
import { DataQualityType } from '../../../../domain/enum/data-quality-type.enum';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../../../testing/translate-testing/translate-testing.module';

@Component({
  selector: 'app-version-view-doc-data-quality',
  templateUrl: './version-view-doc-data-quality.component.html',
  styleUrls: [],
  imports: [TranslateModule, TranslatePipeMock],
})
export class VersionViewDocDataQualityComponent {
  @Input() dmp: Dmp;

  isOtherDataQuality(quality: DataQualityType): boolean {
    return quality === DataQualityType.OTHERS;
  }
}
