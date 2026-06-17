import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Version } from '../../../domain/version';
import { DmpListItem } from '../../../domain/dmp-list-item';
import { Dmp } from '../../../domain/dmp';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatNoDataRow,
} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-version-table',
  templateUrl: './version-table.component.html',
  styleUrls: ['./version-table.component.css'],
  imports: [
    MatButton,
    RouterLink,
    MatIcon,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatNoDataRow,
    DatePipe,
    TranslatePipe],
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
