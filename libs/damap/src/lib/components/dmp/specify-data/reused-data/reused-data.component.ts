import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subject, Subscription, switchMap } from 'rxjs';
import { Dataset } from '../../../../domain/dataset';
import { BackendService } from '../../../../services/backend.service';
import { LoadingState } from '../../../../domain/enum/loading-state.enum';
import { AbstractBaseDataComponent } from '../abstract-base-data.component';
import { DatasetDialogComponent } from '../dataset-dialog/dataset-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataMcComponent } from '../data-mc/data-mc.component';
import { MatButton } from '@angular/material/button';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { DoiSearchComponent } from '../../../../widgets/doi-search/doi-search.component';
import { DatasetTableComponent } from '../dataset-table/dataset-table.component';
import { InfoMessageComponent } from '../../../../widgets/info-message/info-message.component';

@Component({
  selector: 'app-reused-data',
  templateUrl: './reused-data.component.html',
  styleUrls: ['./reused-data.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    DataMcComponent,
    MatButton,
    TranslatePipe,
    TranslateDirective,
    DoiSearchComponent,
    DatasetTableComponent,
    InfoMessageComponent,
  ],
})
export class ReusedDataComponent
  extends AbstractBaseDataComponent
  implements OnInit, OnDestroy
{
  private backendService = inject(BackendService);
  dialog = inject(MatDialog);

  private searchTerms = new Subject<string>();
  private searchResult: Subscription;
  loading: LoadingState = LoadingState.NOT_LOADED;

  result: Dataset;
  duplicate = false;

  readonly tableHeaders: string[] = ['dataset', 'license', 'source', 'actions'];

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
