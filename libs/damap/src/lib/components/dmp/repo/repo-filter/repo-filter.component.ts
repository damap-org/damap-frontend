import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { REPO_FILTERS } from '../repo-filters';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-repo-filter',
  templateUrl: './repo-filter.component.html',
  styleUrls: ['./repo-filter.component.css'],
  standalone: false,
})
export class RepoFilterComponent {
  @Input() filters: { [key: string]: { id: string; label: string }[] };
  @Output() filterChange = new EventEmitter<{
    [key: string]: { id: string; label: string }[];
  }>();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '1000px',
      data: this.filters,
    });

    dialogRef
      .afterClosed()
      .subscribe(
        (result: { [key: string]: { id: string; label: string }[] }) => {
          if (result) {
            this.filterChange.emit(result);
          }
        },
      );
  }
}

@Component({
  selector: 'filter-dialog',
  templateUrl: './filter-dialog.html',
  standalone: false,
})
export class FilterDialogComponent {
  readonly FILTER = REPO_FILTERS;
  filter = {};

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { [key: string]: { id: string; label: string }[] },
  ) {}

  onFilterChange(filterName: string, event: { id: string; label: string }[]) {
    this.filter[filterName] = event;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
