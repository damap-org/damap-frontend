import { Component, Input, OnInit } from '@angular/core';
import { Dmp } from '../../../domain/dmp';
import { select, Store } from '@ngrx/store';
import {
  selectForm,
  selectFormContact,
} from '../../../store/selectors/form.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/states/app.state';
import { Contributor } from '../../../domain/contributor';
import { SummaryService } from '../../../services/summary.service';

import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-dmp-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  constructor(public store: Store<AppState>) {}

  form$: Observable<Dmp>;
  dmpForm: Dmp;
  dataSource;
  contact: Contributor;

  @Input() stepper: MatStepper;

  readonly summaryTableHeaders: string[] = ['step', 'completeness', 'status'];

  ngOnInit(): void {
    this.store
      .pipe(select(selectFormContact))
      .subscribe(val => (this.contact = val));
    this.form$ = this.store.pipe(select(selectForm));
    this.form$.subscribe(value => {
      if (value) {
        this.dmpForm = value;
        this.dataSource = SummaryService.dmpSummary(value);
      }
    });
  }

  navigateToStep(stepIndex: number): void {
    this.stepper.selectedIndex = stepIndex;
  }
}
