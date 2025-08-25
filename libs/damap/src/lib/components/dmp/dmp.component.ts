import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription, take } from 'rxjs';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {
  formDiff,
  resetFormValue,
  setFormValue,
} from '../../store/actions/form.actions';

import { AppState } from '../../store/states/app.state';
import { AuthService } from '../../auth/auth.service';
import { BackendService } from '../../services/backend.service';
import { Config } from '../../domain/config';
import { Contributor } from '../../domain/contributor';
import { DataKind } from '../../domain/enum/data-kind.enum';
import { DataSource } from '../../domain/enum/data-source.enum';
import { Dataset } from '../../domain/dataset';
import { FormService } from '../../services/form.service';
import { HttpEventType } from '@angular/common/http';
import { InfoBoxDetails } from '../../domain/infoBox-details';
import { InfoLabelService } from '../../services/infoLabel.service';
import { InternalStorage } from '../../domain/internal-storage';
import { LegalEthicalAspectsComponent } from './legal-ethical-aspects/legal-ethical-aspects.component';
import { LoggerService } from '../../services/logger.service';
import { MatStepper } from '@angular/material/stepper';
import { PeopleComponent } from './people/people.component';
import { Project } from '../../domain/project';
import { ProjectComponent } from './project/project.component';
import { RepoComponent } from './repo/repo.component';
import { SpecifyDataComponent } from './specify-data/specify-data.component';
import {
  StepperSelectionEvent,
  STEPPER_GLOBAL_OPTIONS,
} from '@angular/cdk/stepper';
import { select, Store } from '@ngrx/store';
import { Dmp } from '../../domain/dmp';
import { selectForm } from '../../store/selectors/form.selectors';
import { Completeness, SummaryService } from '../../services/summary.service';

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  standalone: false,
})
export class DmpComponent implements OnInit, OnDestroy {
  config$: Observable<Config> = new Observable<Config>();
  @ViewChild('projectComponent') projectComponent: ProjectComponent;
  @ViewChild('peopleComponent') peopleComponent: PeopleComponent;
  @ViewChild('specifyData') specifyDataComponent: SpecifyDataComponent;
  @ViewChild('legalEthicalAspects')
  legalEthicalAspectsComponent: LegalEthicalAspectsComponent;
  @ViewChild('repo') repoComponent: RepoComponent;
  livePreviewEnabled: boolean = true;
  ethicalReportEnabled: boolean = true;

  selectedViewStorage: 'primaryView' | 'secondaryView' = 'primaryView';

  get username(): string {
    return this.auth.getUsername();
  }
  get admin(): boolean {
    return this.auth.isAdmin();
  }

  @ViewChild('stepper') stepper: MatStepper;
  dmpForm: UntypedFormGroup;

  formChanged: boolean;

  // Stepper icons
  form$: Observable<Dmp>;
  dmpFormVal: Dmp;
  dataSource: Completeness[];

  // Steps
  projectStep: UntypedFormControl;
  contributorStep: UntypedFormArray;
  specifyDataStep: UntypedFormGroup;
  datasets: UntypedFormArray;
  docDataStep: UntypedFormGroup;
  legalEthicalStep: UntypedFormGroup;
  storageStep: UntypedFormArray;
  externalStorageStep: UntypedFormArray;
  externalStorageInfo: UntypedFormControl;
  repoStep: UntypedFormArray;
  reuseStep: UntypedFormGroup;
  costsStep: UntypedFormGroup;

  // Resources
  projectMembers: Contributor[] = [];
  stepChanged$ = new Subject();

  fileUpload: { file: File; progress: number; finalized: boolean }[] = [];
  fileUploadSubscription: Subscription[] = [];

  instructionStep$ = new BehaviorSubject<any>('');
  infoInstruction: InfoBoxDetails = {};
  selectedStep: number = 0;

  constructor(
    private logger: LoggerService,
    private auth: AuthService,
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService,
    public store: Store<AppState>,
    private infoLabelService: InfoLabelService,
    private cdr: ChangeDetectorRef,
  ) {
    this.dmpForm = this.formService.dmpForm;

    this.form$ = this.store.pipe(select(selectForm));
    this.form$.subscribe(value => {
      if (value) {
        this.dmpFormVal = value;
        this.dataSource = SummaryService.dmpSummary(value);
      }
    });
  }

  onNewDatasetClick() {
    this.stepper.selectedIndex = 2;
    this.cdr.detectChanges();
  }

  onStepChange(selectedStep: number) {
    this.selectedStep = selectedStep;
  }

  ngOnInit() {
    setTimeout(() => {
      this.getInstruction(0);
      this.config$ = this.backendService.loadServiceConfig();
      this.config$.subscribe(config => {
        this.livePreviewEnabled = config.livePreviewAvailable;
        this.ethicalReportEnabled = config.ethicalReportEnabled;
        this.cdr.detectChanges();
      });
      this.dmpForm.valueChanges.subscribe(() => this.cdr.detectChanges());
      this.dmpForm.valueChanges.subscribe(value => {
        this.logger.debug(value);
        this.store.dispatch(formDiff({ newDmp: value }));
      });

      this.projectStep = this.dmpForm.get('project') as UntypedFormControl;
      this.contributorStep = this.dmpForm.get(
        'contributors',
      ) as UntypedFormArray;
      this.specifyDataStep = this.dmpForm.get('data') as UntypedFormGroup;
      this.datasets = this.dmpForm.get('datasets') as UntypedFormArray;
      this.docDataStep = this.dmpForm.get('documentation') as UntypedFormGroup;
      this.legalEthicalStep = this.dmpForm.get('legal') as UntypedFormGroup;
      this.storageStep = this.dmpForm.get('storage') as UntypedFormArray;
      this.externalStorageStep = this.dmpForm.get(
        'externalStorage',
      ) as UntypedFormArray;
      this.externalStorageInfo = this.dmpForm.get(
        'externalStorageInfo',
      ) as UntypedFormControl;
      this.repoStep = this.dmpForm.get('repositories') as UntypedFormArray;
      this.reuseStep = this.dmpForm.get('reuse') as UntypedFormGroup;
      this.costsStep = this.dmpForm.get('costs') as UntypedFormGroup;

      this.getDmpById();
    });
  }

  changeStepPosition(event: StepperSelectionEvent) {
    const stepId = this.stepper._getStepLabelId(this.stepper.selectedIndex);
    const stepElement = document.getElementById(stepId);
    if (stepElement) {
      stepElement.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
    }
  }

  ngOnDestroy() {
    this.formService.resetForm();
    this.store.dispatch(resetFormValue());
  }

  get showStepIfNewDatasets() {
    return (
      this.specifyDataStep?.value.kind === DataKind.SPECIFY &&
      this.datasets?.value.find(dataset => dataset.source == DataSource.NEW)
    );
  }

  get showStep() {
    if (this.specifyDataStep) {
      return (
        (this.specifyDataStep.value.kind === DataKind.SPECIFY ||
          this.specifyDataStep.value.reusedKind === DataKind.SPECIFY) &&
        this.datasets.length
      );
    } else return false;
  }

  changeStep($event: StepperSelectionEvent) {
    this.stepChanged$.next($event);
    this.getInstruction($event.selectedIndex);
    this.cdr.detectChanges();
  }

  handleStepChange(event: StepperSelectionEvent) {
    this.changeStep(event);
    this.changeStepPosition(event);
    this.onStepChange(event.selectedIndex);
  }

  changeProject(project: Project) {
    if (project != null) {
      if (project.universityId) {
        this.getProjectMembers(project.universityId);
      }
      this.projectStep.setValue(project);
      if (project.end != null) {
        this.formService.presetStartDateOnDatasets();
      }
    } else {
      this.projectMembers.length = 0;
      this.projectStep.reset();
    }
  }

  changeContactPerson(contact: Contributor) {
    this.formService.changeContactPerson(contact);
  }

  addContributor(contributor: Contributor) {
    this.formService.addContributorToForm(contributor);
  }

  removeContributor(index: number) {
    this.formService.removeContributorFromForm(index);
  }

  updateContributorDetails(event: { idx: number; contributor: Contributor }) {
    this.formService.upadteContributorOfForm(event.idx, event.contributor);
  }

  addDataset(dataset: Dataset) {
    dataset.referenceHash = this.generateReferenceHash();
    this.formService.addDatasetToForm(dataset);
  }

  updateDataset(event: { index: number; update: Dataset }) {
    this.formService.updateDatasetOfForm(event.index, event.update);
  }

  analyseFile(event: File) {
    const formData = new FormData();
    formData.append('file', event);
    const filename = event.name;
    const reference = this.generateReferenceHash();
    const upload = { file: event, progress: 0, finalized: false };
    this.fileUpload.push(upload);
    const uploadSub = this.backendService.analyseFileData(formData).subscribe({
      next: response => {
        if (response.type === HttpEventType.UploadProgress) {
          upload.progress = Math.round(
            100 * (response.loaded / response.total),
          );
        }
        if (response.type === HttpEventType.Response) {
          const dataset = response.body;
          dataset.title = filename;
          dataset.referenceHash = reference;
          this.formService.addDatasetToForm(dataset);
        }
      },
      error: _ => (upload.finalized = true),
      complete: () => (upload.finalized = true),
    });
    this.fileUploadSubscription.push(uploadSub);
  }

  cancelFileUpload(index: number) {
    this.fileUploadSubscription[index].unsubscribe();
    this.fileUpload[index].finalized = true;
  }

  removeDataset(index: number) {
    this.formService.removeDatasetFromForm(index);
    this.dataSource = SummaryService.dmpSummary(this.dmpForm.getRawValue());
  }

  addStorage(storage: InternalStorage) {
    this.formService.addStorageToForm(storage);
  }

  removeStorage(index: number): void {
    this.formService.removeStorageFromForm(index);
  }

  addExternalStorage() {
    this.formService.addExternalStorageToForm();
  }

  removeExternalStorage(index: number): void {
    this.formService.removeExternalStorageFromForm(index);
  }

  addRepository(repo: { id: string; name: string }) {
    this.formService.addRepositoryToForm(repo);
  }

  removeRepository(index: number): void {
    this.formService.removeRepositoryFromForm(index);
  }

  addCost() {
    this.formService.addCostToForm();
  }

  removeCost(index: number) {
    this.formService.removeCostFromForm(index);
  }

  onViewChangeStorage(view: 'primaryView' | 'secondaryView'): void {
    this.selectedViewStorage = view;
  }

  private getDmpById() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.logger.debug('Get DMP with ID: ' + id);
    this.backendService.getDmpById(id).subscribe(dmp => {
      if (dmp != null) {
        this.formService.mapDmpToForm(dmp);
        this.store.dispatch(setFormValue({ dmp }));
        if (dmp.project?.universityId) {
          this.getProjectMembers(dmp.project.universityId);
        }
        this.cdr.detectChanges();
      } else {
        this.router.navigate(['plans']);
      }
    });
  }

  private getProjectMembers(projectId: number) {
    this.backendService.getProjectMembers(projectId).subscribe(members => {
      this.projectMembers = members ? members : [];
    });
  }

  private generateReferenceHash(): string {
    return this.username + (+new Date()).toString(36);
  }

  getInstruction(index: number) {
    this.infoInstruction = this.infoLabelService.getInfo(index);
    this.instructionStep$.next(this.infoInstruction);
  }

  completenessLabel(label: string) {
    return this.dataSource?.find(value => value.step === label);
  }

  showEditIcon(index: number) {
    if (index < 10) {
      return (
        this.dataSource[index]?.completeness > 0 &&
        this.dataSource[index]?.completeness < 100
      );
    } else return true;
  }

  checkCompletenessForm() {
    let statusCompleteness;
    let statusEdit;
    statusEdit = this.dataSource.find(step => step.completeness > 0);
    statusCompleteness = this.dataSource.find(step => step.completeness < 100);
    if (statusEdit && statusCompleteness) {
      return 'editing';
    } else if (statusEdit && !statusCompleteness) {
      return 'completed';
    } else return false;
  }

  iconsValidatorDone(index: number, icon: string): boolean {
    if (
      icon === 'check' &&
      (index < 3 || this.showStep) &&
      this.dataSource[index]?.completeness === 100
    )
      return true;
    if (
      icon === 'edit' &&
      (index < 3 || this.showStep) &&
      index !== 10 &&
      this.showEditIcon(index)
    )
      return true;
    if (icon === 'lock' && index >= 3 && !this.showStep && index !== 10)
      return true;
    if (
      icon === 'text_snippet' &&
      index === 10 &&
      this.stepper.selectedIndex !== index &&
      this.checkCompletenessForm() === 'completed'
    )
      return true;
    return false;
  }

  iconsValidatorEdit(index: number, icon: string): boolean {
    if (icon === 'lock' && index >= 3 && !this.showStep && index !== 10)
      return true;
    if (
      icon === 'edit' &&
      (index < 3 || (index >= 3 && this.showStep && index !== 10))
    )
      return true;
    if (
      icon === 'text_snippet' &&
      index === 10 &&
      (this.checkCompletenessForm() === false ||
        this.checkCompletenessForm() === 'editing')
    )
      return true;
    return false;
  }

  iconsValidatorNumber(
    index: number,
    icon: string,
    selectStep: number,
    style: string = '',
  ): boolean {
    const isProjectPeopleDataSteps = index < 3;
    const isDocumentationStorageLegalSteps = index >= 3 && index < 6;
    const isLicensingRepoReuseSteps = index >= 6 && index < 9;
    const isCostsStep = index === 9;
    const isSummaryStep = index === 10;

    const completeness = this.checkCompletenessForm();

    if (
      icon === 'number' &&
      (isProjectPeopleDataSteps ||
        ((isDocumentationStorageLegalSteps || isCostsStep) && this.showStep) ||
        (isLicensingRepoReuseSteps && this.showStepIfNewDatasets)) &&
      selectStep !== index &&
      !this.showEditIcon(index)
    )
      return true;

    if (
      icon === 'edit' &&
      (isProjectPeopleDataSteps ||
        (!isProjectPeopleDataSteps && !isSummaryStep && this.showStep)) &&
      selectStep === index
    ) {
      return true;
    }
    if (
      icon === 'text_snippet' &&
      style == 'gray' &&
      isSummaryStep &&
      completeness === false
    )
      return true;
    if (
      icon === 'text_snippet' &&
      style == 'success' &&
      isSummaryStep &&
      (completeness === 'editing' || completeness === 'completed')
    )
      return true;
    if (
      icon === 'lock' &&
      (((isDocumentationStorageLegalSteps || isCostsStep) && !this.showStep) ||
        (isLicensingRepoReuseSteps &&
          !this.showStepIfNewDatasets &&
          selectStep !== index))
    )
      return true;
    else return false;
  }
}
