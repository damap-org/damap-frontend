import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, UntypedFormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';

import { BackendService } from '../../../services/backend.service';
import { DmpStore } from '../../../data-access/dmp.store';
import { ExportWarningDialogComponent } from '../../../widgets/export-warning-dialog/export-warning-dialog.component';
import { FeedbackService } from '../../../services/feedback.service';
import { FormService } from '../../../services/form.service';
import { LivePreviewComponent } from '../live-preview/live-preview.component';
import { Location } from '@angular/common';
import { ConfigService } from '@damap-frontend-shell/app/services/config.service';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SaveStatusComponent } from '../../../widgets/save-status/save-status.component';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { InputWrapperComponent } from '../../../shared/input-wrapper/input-wrapper.component';

@Component({
  selector: 'app-actions',
  templateUrl: './dmp-actions.component.html',
  styleUrls: ['./dmp-actions.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
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
    TranslatePipe,
  ],
})
export class DmpActionsComponent implements OnInit, OnDestroy {
  private formService = inject(FormService);
  private dialog = inject(MatDialog);
  private location = inject(Location);
  private backendService = inject(BackendService);
  private feedbackService = inject(FeedbackService);
  private configService = inject(ConfigService);

  private readonly dmpStore = inject(DmpStore);

  @Input() stepChanged$: Subject<any>;
  readonly admin = input(false);
  readonly preview = input(false);

  dmpForm: FormGroup;

  readonly savingDmp = this.dmpStore.savingDmp;
  formChanged = this.formService.formChanged();

  private readonly syncChanged = effect(() => {
    this.formChanged = this.formService.formChanged();
  });

  exportDmpType: number;

  private subscriptions: Subscription[] = [];

  constructor() {
    this.dmpForm = this.formService.dmpForm;
  }

  ngOnInit(): void {
    // Prevent autosave for admins
    if (!this.admin()) {
      this.subscriptions.push(this.stepChanged$.subscribe((_) => this.saveDmp()));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  saveDmp() {
    if (this.dmpForm.valid && !this.savingDmp()) {
      const dmp = this.formService.exportFormToDmp();
      if (this.dmpForm.value.id) {
        this.dmpStore.updateDmp(dmp).subscribe();
      } else {
        this.dmpStore.createDmp(dmp).subscribe((savedDmp) => {
          if (savedDmp.id) {
            this.location.go(`/dmp/${savedDmp.id}`);
          }
        });
      }
    }
  }

  saveDmpVersion(): void {
    const dialogRef = this.dialog.open(SaveVersionDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((versionName) => {
      if (versionName && versionName.length <= 255) {
        this.dmpStore.saveDmpVersion(this.formService.exportFormToDmp(), versionName).subscribe();
      } else if (versionName?.length > 255) {
        this.feedbackService.error('Version name is too long');
      }
    });
  }

  dispatchExportDmp(): void {
    this.dmpStore.exportDmp(this.formService.exportFormToDmp()).subscribe();
  }

  exportDmpTemplate(): void {
    const dialogRef = this.dialog.open(ExportWarningDialogComponent, {});
    let funderSupported: boolean =
      this.dmpForm.controls.project?.getRawValue()?.funderSupported ?? false;

    if (funderSupported && this.dmpForm.value.id) {
      this.backendService.getTemplateType(this.dmpForm.value.id).subscribe((response) => {
        const templates = this.configService.getConfig()?.templates || [];
        const activeMatch = templates.find((t) => t.templateCategory === response && t.active);
        const fallbackId = templates.find((t) => t.active)?.id || null;
        dialogRef.componentInstance.selectedTemplate = activeMatch ? activeMatch.id : fallbackId;
      });
    } else {
      const templates = this.configService.getConfig()?.templates || [];
      dialogRef.componentInstance.selectedTemplate = templates.find((t) => t.active)?.id || null;
    }

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'cancel') {
        this.exportDmpType = result;
        this.dmpStore.exportDmp(this.formService.exportFormToDmp(), this.exportDmpType).subscribe();
      }
    });
  }

  previewEnabled(): boolean {
    return this.dmpForm.value.id !== null;
  }

  showPreview(): void {
    if (this.dmpForm.controls.project?.getRawValue()?.funderSupported) {
      this.backendService.getTemplateType(this.dmpForm.value.id).subscribe((response) => {
        const dialogRef = this.dialog.open(LivePreviewComponent, {
          maxHeight: '90vh',
          maxWidth: '70vw',
          width: '70vw',
          height: '90vh',
        });
        const templates = this.configService.getConfig()?.templates || [];
        const activeMatch = templates.find((t) => t.templateCategory === response && t.active);
        const fallbackId = templates.find((t) => t.active)?.id || null;
        dialogRef.componentInstance.selectedTemplate = activeMatch ? activeMatch.id : fallbackId;
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
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    InputWrapperComponent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    TranslatePipe,
  ],
})
export class SaveVersionDialogComponent {
  dialogRef = inject<MatDialogRef<SaveVersionDialogComponent>>(MatDialogRef);

  versionName = '';
  mockControl = new UntypedFormControl();

  onNoClick(): void {
    this.dialogRef.close();
  }

  readInput(input: string): void {
    this.versionName = input;
  }
}
