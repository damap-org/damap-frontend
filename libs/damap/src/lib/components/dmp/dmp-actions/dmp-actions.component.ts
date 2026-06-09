import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Observable, Subject, Subscription, filter, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  createDmp,
  exportDmp,
  exportDmpTemplate,
  saveDmpVersion,
  updateDmp,
} from '../../../store/actions/dmp.actions';
import {
  selectForm,
  selectFormChanged,
} from '../../../store/selectors/form.selectors';

import { AppState } from '../../../store/states/app.state';
import { BackendService } from '../../../services/backend.service';
import { ETemplateType } from '../../../domain/enum/export-template-type.enum';
import { ExportWarningDialogComponent } from '../../../widgets/export-warning-dialog/export-warning-dialog.component';
import { FeedbackService } from '../../../services/feedback.service';
import { FormService } from '../../../services/form.service';
import { LivePreviewComponent } from '../live-preview/live-preview.component';
import { Location } from '@angular/common';
import { selectDmpSaving } from '../../../store/selectors/dmp.selectors';
import { ConfigService } from '../../../../../../../apps/damap-frontend/src/app/services/config.service';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatButton } from '@angular/material/button';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { SaveStatusComponent } from '../../../widgets/save-status/save-status.component';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { InputWrapperComponent } from '../../../shared/input-wrapper/input-wrapper.component';

@Component({
  selector: 'app-actions',
  templateUrl: './dmp-actions.component.html',
  styleUrls: ['./dmp-actions.component.css'],
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatButton,
    RouterLinkActive,
    RouterLink,
    SaveStatusComponent,
    MatTooltip,
    TranslateModule,
  ],
})
export class DmpActionsComponent implements OnInit, OnDestroy {
  @Input() stepChanged$: Subject<any>;
  @Input() admin = false;
  @Input() preview = false;

  dmpForm: FormGroup;

  formChanged$: Observable<boolean>;
  formChanged: boolean;
  savingDmp$: Observable<boolean>;
  savingDmp: boolean;

  exportDmpType: number;

  private subscriptions: Subscription[] = [];

  constructor(
    private formService: FormService,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private location: Location,
    private backendService: BackendService,
    private feedbackService: FeedbackService,
    private configService: ConfigService,
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
      if (versionName && versionName.length <= 255) {
        this.store.dispatch(
          saveDmpVersion({
            dmp: this.formService.exportFormToDmp(),
            versionName,
          }),
        );
      } else if (versionName.length > 255) {
        this.feedbackService.error('Version name is too long');
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

    if (funderSupported && this.dmpForm.value.id) {
      this.backendService
        .getTemplateType(this.dmpForm.value.id)
        .subscribe(response => {
          const templates = this.configService.getConfig()?.templates || [];
          const activeMatch = templates.find(
            t => t.templateCategory === response && t.active,
          );
          const fallbackId = templates.find(t => t.active)?.id || null;
          dialogRef.componentInstance.selectedTemplate = activeMatch
            ? activeMatch.id
            : fallbackId;
        });
    } else {
      const templates = this.configService.getConfig()?.templates || [];
      dialogRef.componentInstance.selectedTemplate =
        templates.find(t => t.active)?.id || null;
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result && result !== 'cancel') {
        const template = result;
        this.exportDmpType = template;
        this.store.dispatch(
          exportDmpTemplate({
            dmp: this.formService.exportFormToDmp(),
            dmpTemplateType: this.exportDmpType,
          }),
        );
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
          const templates = this.configService.getConfig()?.templates || [];
          const activeMatch = templates.find(
            t => t.templateCategory === response && t.active,
          );
          const fallbackId = templates.find(t => t.active)?.id || null;
          dialogRef.componentInstance.selectedTemplate = activeMatch
            ? activeMatch.id
            : fallbackId;
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
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    InputWrapperComponent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    TranslateModule,
  ],
})
export class SaveVersionDialogComponent {
  versionName = '';
  mockControl = new UntypedFormControl();

  constructor(public dialogRef: MatDialogRef<SaveVersionDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  readInput(input: string): void {
    this.versionName = input;
  }
}
