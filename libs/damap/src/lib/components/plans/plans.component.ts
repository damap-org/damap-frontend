import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { deleteDmp, loadDmps } from '../../store/actions/dmp.actions';
import {
  selectDmps,
  selectDmpsLoaded,
} from '../../store/selectors/dmp.selectors';

import { AppState } from '../../store/states/app.state';
import { AuthService } from '../../auth/auth.service';
import { BackendService } from '../../services/backend.service';
import { DeleteWarningDialogComponent } from '../../widgets/delete-warning-dialog/delete-warning-dialog.component';
import { DmpListItem } from '../../domain/dmp-list-item';
import { ETemplateType } from '../../domain/enum/export-template-type.enum';
import { ExportWarningDialogComponent } from '../../widgets/export-warning-dialog/export-warning-dialog.component';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { LoadingState } from '../../domain/enum/loading-state.enum';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-plan',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
  standalone: false,
})
export class PlansComponent implements OnInit {
  dmps$: Observable<DmpListItem[]>;
  dmpsLoaded$: Observable<LoadingState>;
  LoadingState = LoadingState;
  exportDmpType: ETemplateType;
  dmpForm: FormGroup;

  allDmps$: Observable<DmpListItem[]>;

  constructor(
    private store: Store<AppState>,
    private backendService: BackendService,
    private authService: AuthService,
    private formService: FormService,
    private dialog: MatDialog,
  ) {
    this.dmps$ = this.store.pipe(select(selectDmps));
    this.dmpsLoaded$ = this.store.pipe(select(selectDmpsLoaded));
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
    this.store.dispatch(loadDmps(false));
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
        this.backendService.exportDmpTemplate(id, this.exportDmpType);
      } else {
        this.backendService.getDmpDocument(id);
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
                return this.store.dispatch(deleteDmp({ id }));
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
