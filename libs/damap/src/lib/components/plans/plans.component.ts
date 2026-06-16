import { Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { BackendService } from '../../services/backend.service';
import { DeleteWarningDialogComponent } from '../../widgets/delete-warning-dialog/delete-warning-dialog.component';
import { DmpApi } from '../../data-access/dmp.api';
import { DmpStore } from '../../data-access/dmp.store';
import { DmpListItem } from '../../domain/dmp-list-item';
import { ETemplateType } from '../../domain/enum/export-template-type.enum';
import { ExportWarningDialogComponent } from '../../widgets/export-warning-dialog/export-warning-dialog.component';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { LoadingState } from '../../domain/enum/loading-state.enum';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InfoCardComponent } from '../../widgets/info-card/info-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { DmpTableComponent } from '../../widgets/dmp-table/dmp-table.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ErrorMessageComponent } from '../../widgets/error-message/error-message.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-plan',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
  imports: [
    InfoCardComponent,
    TranslateModule,
    DmpTableComponent,
    MatProgressBar,
    ErrorMessageComponent,
    AsyncPipe,
  ],
})
export class PlansComponent implements OnInit {
  private readonly dmpStore = inject(DmpStore);

  readonly dmps = this.dmpStore.dmps;
  readonly dmpsLoaded = this.dmpStore.dmpsLoaded;
  LoadingState = LoadingState;
  exportDmpType: number;
  dmpForm: FormGroup;

  allDmps$: Observable<DmpListItem[]>;

  constructor(
    private backendService: BackendService,
    private dmpApi: DmpApi,
    private authService: AuthService,
    private formService: FormService,
    private dialog: MatDialog,
  ) {
    this.dmpForm = this.formService.dmpForm;
  }

  ngOnInit() {
    this.getDmps();

    if (this.isAdmin()) {
      this.getAllDmps();
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  getDmps() {
    this.dmpStore.loadDmps(false);
  }

  getDocument(id: number) {
    this.backendService.getDmpById(id).subscribe(x => {
      this.openExportWarningDialog(x.project?.funderSupported, id);
    });
  }

  openExportWarningDialog(funderSupported: boolean, id: number): void {
    const dialogRef = this.dialog.open(ExportWarningDialogComponent, {});
    dialogRef.componentInstance.funderSupported = funderSupported;

    dialogRef.beforeClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }

      if (!funderSupported) {
        const template = result;
        this.exportDmpType = template;
        this.dmpApi.exportDmpTemplate(id, this.exportDmpType).subscribe();
      } else {
        this.dmpApi.exportDmp(id).subscribe();
      }
    });
  }

  getJsonFile(id: number) {
    this.backendService.getMaDmpJsonFile(id);
  }

  deleteDmp(id: number) {
    this.dialog
      .open(DeleteWarningDialogComponent)
      .afterClosed()
      .subscribe({
        next: response => {
          if (response) {
            this.backendService.deleteDmp(id).subscribe({
              next: _ => {
                if (this.isAdmin()) {
                  this.getAllDmps();
                }
                this.dmpStore.removeDmp(id);
              },
            });
          }
        },
      });
  }

  private getAllDmps(): void {
    this.allDmps$ = this.backendService.getAllDmps();
  }
}
