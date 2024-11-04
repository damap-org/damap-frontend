import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { DmpListItem } from '../../domain/dmp-list-item';
import { FunctionRole } from '../../domain/enum/function-role.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dmp-table',
  templateUrl: './dmp-table.component.html',
  styleUrls: ['./dmp-table.component.css'],
})
export class DmpTableComponent implements OnChanges, AfterViewInit {
  @Input() dmps: DmpListItem[];
  @Input() admin = false;
  dataSource = new MatTableDataSource();

  @Output() createDocument = new EventEmitter<number>();
  @Output() createJsonFile = new EventEmitter<number>();
  @Output() dmpToDelete = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly tableHeaders: string[] = [
    'title',
    'version',
    'version_name',
    'created',
    'modified',
    'contact',
    'edit',
  ];
  readonly FUNCTION_ROLES = FunctionRole;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dmps) {
      this.dataSource.data = this.dmps;
    }
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = (data: DmpListItem, filter: string) =>
      data.project?.title?.toLowerCase().includes(filter) ||
      data.title?.toLowerCase().includes(filter) ||
      data.latestVersionName?.toLowerCase().includes(filter) ||
      data.versionCount?.toString().includes(filter) ||
      data.id.toString().includes(filter);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (
      item: DmpListItem,
      property: string,
    ) => {
      switch (property) {
        case 'title':
          return item.project?.title || 'DMP ID: ' + item.id;
        case 'contact':
          return item.contact?.firstName + ' ' + item.contact?.lastName;
        case 'version':
          return item.versionCount;
        case 'version_name':
          return item.latestVersionName;
        default:
          return item[property];
      }
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDocument(id: number) {
    this.createDocument.emit(id);
  }

  getJsonFile(id: number) {
    this.createJsonFile.emit(id);
  }

  deleteDmp(id: number) {
    this.dmpToDelete.emit(id);
  }
}
