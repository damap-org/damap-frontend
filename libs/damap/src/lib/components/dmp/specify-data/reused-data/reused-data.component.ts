import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subject, Subscription, switchMap } from 'rxjs';
import { Dataset } from '../../../../domain/dataset';
import { BackendService } from '../../../../services/backend.service';
import { LoadingState } from '../../../../domain/enum/loading-state.enum';
import { AbstractBaseDataComponent } from '../abstract-base-data.component';
import { DatasetDialogComponent } from '../dataset-dialog/dataset-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reused-data',
  templateUrl: './reused-data.component.html',
  styleUrls: ['./reused-data.component.css'],
})
export class ReusedDataComponent
  extends AbstractBaseDataComponent
  implements OnInit, OnDestroy
{
  private searchTerms = new Subject<string>();
  private searchResult: Subscription;
  loading: LoadingState = LoadingState.NOT_LOADED;

  result: Dataset;
  duplicate = false;

  readonly tableHeaders: string[] = ['dataset', 'source', 'actions'];

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.searchResult = this.searchTerms
      .pipe(
        switchMap((term: string) => {
          this.loading = LoadingState.LOADING;
          return this.backendService.searchDataset(term);
        }),
      )
      .subscribe({
        next: (dataset: Dataset) => {
          if (dataset) {
            this.add(dataset);
          }
          this.result = dataset;
          this.loading = LoadingState.LOADED;
        },
        error: () => {
          this.result = null;
          this.loading = LoadingState.FAILED;
        },
      });
  }

  ngOnDestroy(): void {
    this.searchResult.unsubscribe();
  }

  get reusedKind(): UntypedFormControl {
    return this.specifyDataStep.get('reusedKind') as UntypedFormControl;
  }

  searchDataset(term: string): void {
    this.duplicate = false;
    this.result = undefined;

    if (this.datasets) {
      for (let i = 0; i < this.datasets.length; i++) {
        if (
          this.datasets.value.at(i).datasetId &&
          this.datasets.value.at(i).datasetId.identifier === term
        ) {
          this.duplicate = true;
          return;
        }
      }
    }

    this.searchTerms.next(term);
  }

  openDatasetDialog() {
    const dialogRef = this.dialog.open(DatasetDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: { dataset: { source: this.datasetSource.REUSED } },
    });

    dialogRef.afterClosed().subscribe(dataset => {
      if (dataset) {
        this.datasetToAdd.emit(dataset);
      }
    });
  }
}
