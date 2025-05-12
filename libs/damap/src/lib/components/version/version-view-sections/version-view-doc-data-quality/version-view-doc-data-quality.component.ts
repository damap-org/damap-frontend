import { Component, Input } from '@angular/core';
import { Dmp } from '../../../../domain/dmp';
import { DataQualityType } from '../../../../domain/enum/data-quality-type.enum';

@Component({
  selector: 'app-version-view-doc-data-quality',
  templateUrl: './version-view-doc-data-quality.component.html',
  styleUrls: [],
  standalone: false,
})
export class VersionViewDocDataQualityComponent {
  @Input() dmp: Dmp;

  isOtherDataQuality(quality: DataQualityType): boolean {
    return quality === DataQualityType.OTHERS;
  }
}
