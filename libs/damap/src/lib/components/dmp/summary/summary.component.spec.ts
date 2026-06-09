import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  selectForm,
  selectFormContact,
} from '../../../store/selectors/form.selectors';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { SummaryComponent } from './summary.component';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { completeDmp } from '../../../mocks/dmp-mocks';
import { mockContact } from '../../../mocks/contributor-mocks';
import { provideMockStore } from '@ngrx/store/testing';
import { BackendService } from '../../../services/backend.service';
import { of } from 'rxjs';
import { Benchmark } from '../../../domain/benchmark';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let backendSpy: jasmine.SpyObj<BackendService>;
  const initialState = {
    form: { dmp: null, changed: false },
  };

  beforeEach(waitForAsync(() => {
    backendSpy = jasmine.createSpyObj('BackendService', [
      'loadServiceConfig',
      'getBenchmarks',
    ]);
    backendSpy.loadServiceConfig.and.returnValue(
      of({ evaluationAvailable: true } as any),
    );
    backendSpy.getBenchmarks.and.returnValue(of([]));

    TestBed.configureTestingModule({
    imports: [MatTableModule, MatProgressBarModule, TranslateTestingModule, SummaryComponent],
    providers: [
        { provide: BackendService, useValue: backendSpy },
        provideMockStore({
            initialState,
            selectors: [
                { selector: selectForm, value: completeDmp },
                { selector: selectFormContact, value: mockContact },
            ],
        }),
    ],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should default to the FWF benchmark if it exists', () => {
    backendSpy.getBenchmarks.and.returnValue(
      of([
        { identifier: 'bench-2', title: 'Benchmark 2' },
        { identifier: '69ef5cdfcde500798dbd1af8', title: 'FWF Benchmark' },
      ]),
    );
    fixture.detectChanges();
    expect(component.selectedBenchmarkId()).toBe('69ef5cdfcde500798dbd1af8');
  });

  it('should fallback to the first benchmark if FWF benchmark does not exist', () => {
    backendSpy.getBenchmarks.and.returnValue(
      of([
        { identifier: 'bench-2', title: 'Benchmark 2' },
        { identifier: 'bench-3', title: 'Benchmark 3' },
      ]),
    );
    fixture.detectChanges();
    expect(component.selectedBenchmarkId()).toBe('bench-2');
  });
});
