import {
  Component,
  EventEmitter,
  Output,
  inject,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { REPO_FILTERS } from '../repo-filters';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { TreeSelectFormFieldComponent } from '../../../../widgets/tree-select-form-field/tree-select-form-field.component';

@Component({
  selector: 'app-repo-filter',
  templateUrl: './repo-filter.component.html',
  styleUrls: ['./repo-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatButton, MatIcon, TranslatePipe],
})
export class RepoFilterComponent {
  dialog = inject(MatDialog);

  readonly filters = input<{
    [key: string]: {
      id: string;
      label: string;
    }[];
  }>(undefined);
  @Output() filterChange = new EventEmitter<{
    [key: string]: { id: string; label: string }[];
  }>();

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '1000px',
      data: this.filters(),
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
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    TreeSelectFormFieldComponent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    TranslatePipe,
  ],
})
export class FilterDialogComponent {
  dialogRef = inject<MatDialogRef<FilterDialogComponent>>(MatDialogRef);
  data = inject<{
    [key: string]: {
      id: string;
      label: string;
    }[];
  }>(MAT_DIALOG_DATA);

  readonly FILTER = REPO_FILTERS;
  filter = {};

  onFilterChange(filterName: string, event: { id: string; label: string }[]) {
    this.filter[filterName] = event;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
