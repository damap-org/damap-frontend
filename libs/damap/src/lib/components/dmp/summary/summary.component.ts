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
import { EvaluationService } from '../../../services/evaluation.service';

type LoadingState = 'idle' | 'loading' | 'loaded' | 'failed';
type EvalState = 'idle' | 'loading' | 'done' | 'failed';

@Component({
  selector: 'app-dmp-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  standalone: false,
})
export class SummaryComponent implements OnInit {
  private readonly FWF_IDS = [
    '501100002428',
    'https://ror.org/013tf3c58',
    '0000 0001 1091 8438',
  ];

  form$: Observable<Dmp>;
  dmpForm: Dmp;
  dataSource;
  contact: Contributor;

  @Input() stepper: MatStepper;

  readonly summaryTableHeaders: string[] = ['step', 'completeness', 'status'];

  // Evaluation signals
  readonly benchmarks = signal<Benchmark[]>([]);
  readonly benchmarksLoaded = signal<LoadingState>('idle');
  readonly selectedBenchmarkId = signal<string | null>(null);
  readonly evaluationResults = signal<EvaluationResult[]>([]);
  readonly evaluating = signal<EvalState>('idle');
  readonly expandedResults = signal<Set<string>>(new Set());

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
    private evalService: EvaluationService,
  ) {
    // Auto-select benchmark once loaded: FWF for FWF projects, first otherwise
    effect(() => {
      const benchmarks = this.benchmarks();
      if (benchmarks.length === 0 || this.selectedBenchmarkId()) return;

      const fwf = benchmarks.find(
        b =>
          b.identifier?.toLowerCase().includes('fwf') ||
          b.title?.toLowerCase().includes('fwf'),
      );
      const target = this.isFwfProject ? fwf : null;
      this.selectedBenchmarkId.set((target ?? benchmarks[0]).identifier);
    });
  }

  get isFwfProject(): boolean {
    return this.FWF_IDS.includes(
      this.dmpForm?.project?.funding?.funderId?.identifier ?? '',
    );
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

    this.loadBenchmarks();
  }

  private loadBenchmarks(): void {
    this.benchmarksLoaded.set('loading');
    this.evalService.getBenchmarks().subscribe({
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
    this.expandedResults.set(new Set());
    this.evalService.runEvaluation(dmpId, benchmarkId).subscribe({
      next: r => {
        this.evaluationResults.set(r);
        this.evaluating.set('done');
      },
      error: () => this.evaluating.set('failed'),
    });
  }

  toggleExpand(id: string): void {
    const current = new Set(this.expandedResults());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.expandedResults.set(current);
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

  getPillClass(value: EvaluationValue): string {
    if (value === 'PASS') return 'pill pill-pass';
    if (value === 'FAIL') return 'pill pill-fail';
    return 'pill pill-warn';
  }

  getPillLabel(value: EvaluationValue): string {
    if (value === 'PASS') return 'passed';
    if (value === 'FAIL') return 'failed';
    if (value === 'NOT_APPLICABLE') return 'n/a';
    return 'warning';
  }
}
