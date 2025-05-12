import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Version } from '../../../domain/version';
import { DmpListItem } from '../../../domain/dmp-list-item';
import { Dmp } from '../../../domain/dmp';

@Component({
  selector: 'app-version-table',
  templateUrl: './version-table.component.html',
  styleUrls: ['./version-table.component.css'],
  standalone: false,
})
export class VersionTableComponent {
  displayedColumns: string[] = ['version', 'name', 'date', 'editor'];

  @Input() dmp: DmpListItem | Dmp;
  @Input() versions: Version[];
  @Output() versionToView = new EventEmitter<number>();

  viewVersion(revision: number) {
    this.versionToView.emit(revision);
  }
}
