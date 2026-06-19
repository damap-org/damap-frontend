import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Dmp } from '../../../../domain/dmp';
import { DataQualityType } from '../../../../domain/enum/data-quality-type.enum';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-version-view-doc-data-quality',
  templateUrl: './version-view-doc-data-quality.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslatePipe],
})
export class VersionViewDocDataQualityComponent {
  @Input() dmp: Dmp;

  isOtherDataQuality(quality: DataQualityType): boolean {
    return quality === DataQualityType.OTHERS;
  }
}
