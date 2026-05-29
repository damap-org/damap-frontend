import {
  Component,
  computed,
  effect,
  Input,
  OnInit,
  signal,
} from '@angular/core';
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
import { Benchmark } from '../../../domain/benchmark';
import {
  EvaluationResult,
  EvaluationValue,
} from '../../../domain/evaluation-result';
import { BackendService } from '../../../services/backend.service';

type LoadingState = 'idle' | 'loading' | 'loaded' | 'failed';
type EvalState = 'idle' | 'loading' | 'done' | 'failed';

@Component({
  selector: 'app-dmp-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  standalone: false,
})
export class SummaryComponent implements OnInit {
  private readonly DEFAULT_BENCHMARK_ID = '69ef5cdfcde500798dbd1af8'; // FWF Benchmark

  form$: Observable<Dmp>;
  dmpForm: Dmp;
  dataSource;
  contact: Contributor;

  @Input() stepper: MatStepper;

  readonly summaryTableHeaders: string[] = ['step', 'completeness', 'status'];

  // Evaluation signals
  readonly evaluationEnabled = signal<boolean>(false);
  readonly benchmarks = signal<Benchmark[]>([]);
  readonly benchmarksLoaded = signal<LoadingState>('idle');
  readonly selectedBenchmarkId = signal<string | null>(null);
  readonly evaluationResults = signal<EvaluationResult[]>([]);
  readonly evaluating = signal<EvalState>('idle');

  // Result summary counts
  readonly passedCount = computed(
    () => this.evaluationResults().filter(r => r.value === 'PASS').length,
  );
  readonly failedCount = computed(
    () => this.evaluationResults().filter(r => r.value === 'FAIL').length,
  );
  readonly warningCount = computed(
    () =>
      this.evaluationResults().filter(
        r => r.value === 'ERROR' || r.value === 'INDERTERMINATED',
      ).length,
  );
  readonly overallVerdict = computed<'PASS' | 'FAIL' | null>(() => {
    const results = this.evaluationResults();
    if (results.length === 0) return null;
    return results.some(r => r.value === 'FAIL') ? 'FAIL' : 'PASS';
  });

  readonly selectedBenchmarkTitle = computed(() => {
    const id = this.selectedBenchmarkId();
    return this.benchmarks().find(b => b.identifier === id)?.title ?? '';
  });

  constructor(
    public store: Store<AppState>,
    private backendService: BackendService,
  ) {
    // Auto-select benchmark once loaded: FWF benchmark by default, first otherwise
    effect(() => {
      const benchmarks = this.benchmarks();
      if (benchmarks.length === 0 || this.selectedBenchmarkId()) return;

      const target = benchmarks.find(
        b => b.identifier === this.DEFAULT_BENCHMARK_ID,
      );
      this.selectedBenchmarkId.set((target ?? benchmarks[0]).identifier);
    });
  }

  get canEvaluate(): boolean {
    return (
      !!this.dmpForm?.id &&
      !!this.selectedBenchmarkId() &&
      this.evaluating() !== 'loading'
    );
  }

  get hasResults(): boolean {
    return this.evaluationResults().length > 0;
  }

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

    this.backendService.loadServiceConfig().subscribe({
      next: config => {
        this.evaluationEnabled.set(config.evaluationAvailable);
        if (config.evaluationAvailable) {
          this.loadBenchmarks();
        }
      },
    });
  }

  private loadBenchmarks(): void {
    this.benchmarksLoaded.set('loading');
    this.backendService.getBenchmarks().subscribe({
      next: b => {
        this.benchmarks.set(b);
        this.benchmarksLoaded.set('loaded');
      },
      error: () => this.benchmarksLoaded.set('failed'),
    });
  }

  navigateToStep(stepIndex: number): void {
    this.stepper.selectedIndex = stepIndex;
  }

  runEvaluation(): void {
    const dmpId = this.dmpForm?.id;
    const benchmarkId = this.selectedBenchmarkId();
    if (!dmpId || !benchmarkId) return;
    this.evaluating.set('loading');
    this.evaluationResults.set([]);
    this.backendService.runEvaluation(dmpId, benchmarkId).subscribe({
      next: r => {
        this.evaluationResults.set(r);
        this.evaluating.set('done');
      },
      error: () => this.evaluating.set('failed'),
    });
  }

  getResultIcon(value: EvaluationValue): string {
    if (value === 'PASS') return 'check_circle';
    if (value === 'FAIL') return 'cancel';
    return 'error';
  }

  getResultIconClass(value: EvaluationValue): string {
    if (value === 'PASS') return 'icon-pass';
    if (value === 'FAIL') return 'icon-fail';
    return 'icon-warn';
  }
}
