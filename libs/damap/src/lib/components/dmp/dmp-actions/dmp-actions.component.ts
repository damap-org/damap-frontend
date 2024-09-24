import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, Observable, Subject, Subscription, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  createDmp,
  exportDmp,
  exportDmpTemplate,
  saveDmpVersion,
  updateDmp,
} from '../../../store/actions/dmp.actions';

import { AppState } from '../../../store/states/app.state';
import { ETemplateType } from '../../../domain/enum/export-template-type.enum';
import { ExportWarningDialogComponent } from '../../../widgets/export-warning-dialog/export-warning-dialog.component';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { selectDmpSaving } from '../../../store/selectors/dmp.selectors';
import {
  selectForm,
  selectFormChanged,
} from '../../../store/selectors/form.selectors';
import { Location } from '@angular/common';
import { LivePreviewComponent } from '../live-preview/live-preview.component';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-actions',
  templateUrl: './dmp-actions.component.html',
  styleUrls: ['./dmp-actions.component.css'],
})
export class DmpActionsComponent implements OnInit, OnDestroy {
  @Input() stepChanged$: Subject<any>;
  @Input() admin = false;

  dmpForm: FormGroup;

  formChanged$: Observable<boolean>;
  formChanged: boolean;
  savingDmp$: Observable<boolean>;
  savingDmp: boolean;

  exportDmpType: ETemplateType;

  private subscriptions: Subscription[] = [];

  constructor(
    private formService: FormService,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private location: Location,
    private backendService: BackendService,
  ) {
    this.dmpForm = this.formService.dmpForm;
  }

  ngOnInit(): void {
    this.formChanged$ = this.store.pipe(select(selectFormChanged));
    this.savingDmp$ = this.store.pipe(select(selectDmpSaving));
    this.subscriptions.push(
      this.formChanged$.subscribe(value => (this.formChanged = value)),
    );
    this.subscriptions.push(
      this.savingDmp$.subscribe(value => (this.savingDmp = value)),
    );
    // Prevent autosave for admins
    if (!this.admin) {
      this.subscriptions.push(this.stepChanged$.subscribe(_ => this.saveDmp()));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  saveDmp() {
    if (this.dmpForm.valid && this.formChanged && !this.savingDmp) {
      const dmp = this.formService.exportFormToDmp();
      if (this.dmpForm.value.id) {
        this.store.dispatch(updateDmp({ dmp }));
      } else {
        this.store.dispatch(createDmp({ dmp }));
        this.store
          .select(selectForm)
          .pipe(
            filter(formState => !!formState?.id),
            take(1),
          )
          .subscribe(formState => {
            const newDmpId = formState?.id;
            this.location.go(`/dmp/${newDmpId}`);
          });
      }
    }
  }

  saveDmpVersion(): void {
    const dialogRef = this.dialog.open(SaveVersionDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(versionName => {
      if (versionName) {
        this.store.dispatch(
          saveDmpVersion({
            dmp: this.formService.exportFormToDmp(),
            versionName,
          }),
        );
      }
    });
  }

  dispatchExportDmp(): void {
    this.store.dispatch(exportDmp({ dmp: this.formService.exportFormToDmp() }));
  }

  exportDmpTemplate(): void {
    const dialogRef = this.dialog.open(ExportWarningDialogComponent, {});
    let funderSupported: boolean =
      this.dmpForm.controls.project?.getRawValue()?.funderSupported ?? false;
    dialogRef.componentInstance.funderSupported = funderSupported;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel' || result === undefined) {
      } else {
        // Handle the actual export action
        const template = result;
        if (!funderSupported) {
          this.exportDmpType = template;
          this.store.dispatch(
            exportDmpTemplate({
              dmp: this.formService.exportFormToDmp(),
              dmpTemplateType: this.exportDmpType,
            }),
          );
        } else {
          this.dispatchExportDmp();
        }
      }
    });
  }

  previewEnabled(): boolean {
    return this.dmpForm.value.id !== null;
  }

  showPreview(): void {
    if (this.dmpForm.controls.project?.getRawValue()?.funderSupported) {
      this.backendService
        .getTemplateType(this.dmpForm.value.id)
        .subscribe(response => {
          const dialogRef = this.dialog.open(LivePreviewComponent, {
            maxHeight: '90vh',
            maxWidth: '70vw',
            width: '70vw',
            height: '90vh',
          });

          dialogRef.componentInstance.selectedTemplate = response;
        });
    } else {
      const dialogRef = this.dialog.open(LivePreviewComponent, {
        maxHeight: '90vh',
        maxWidth: '70vw',
        width: '70vw',
        height: '90vh',
      });
    }
  }
}

@Component({
  selector: 'app-save-version-dialog',
  templateUrl: 'save-version-dialog.html',
  styleUrls: ['./dmp-actions.component.css'],
})
export class SaveVersionDialogComponent {
  versionName = '';

  constructor(public dialogRef: MatDialogRef<SaveVersionDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
