import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  ChangeDetectionStrategy,
  output,
} from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ServiceConfig } from '../../../domain/config-services';
import { SearchResult } from '../../../domain/search/search-result';
import { Contributor } from '../../../domain/contributor';
import { Dataset } from '../../../domain/dataset';
import { ContributorRole } from '../../../domain/enum/contributor-role.enum';
import { IdentifierType } from '../../../domain/enum/identifier-type.enum';
import { BackendService } from '../../../services/backend.service';
import { PersonSearchComponent } from '../../../widgets/person-search/person-search.component';
import { Config } from '../../../domain/config';
import { orcidValidator } from '../../../validators/orcid.validator';
import { notEmptyValidator } from '../../../validators/not-empty.validator';
import { ContributorFilterPipe } from './contributor-filter.pipe';
import { FeedbackService } from '../../../services/feedback.service';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ContributorManualComponent } from './contributor-manual/contributor-manual.component';
import { OrcidComponent } from '../../../widgets/orcid/orcid.component';
import { InputWrapperComponent } from '../../../shared/input-wrapper/input-wrapper.component';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-dmp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [ContributorFilterPipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    PersonSearchComponent,
    MatFormField,
    MatSelect,
    MatOption,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatButton,
    MatIcon,
    MatCard,
    ContributorManualComponent,
    MatCardContent,
    OrcidComponent,
    MatIconButton,
    InputWrapperComponent,
    AsyncPipe,
    KeyValuePipe,
    TranslatePipe,
    ContributorFilterPipe,
  ],
})
export class PeopleComponent implements OnInit, OnDestroy {
  private backendService = inject(BackendService);
  private cdr = inject(ChangeDetectorRef);
  dialog = inject(MatDialog);
  private feedbackService = inject(FeedbackService);
  private contributorFilter = inject(ContributorFilterPipe);

  @ViewChild(PersonSearchComponent) personSearch: PersonSearchComponent;

  @Input() config$: Observable<Config>;
  @Input() projectMembers: Contributor[];
  @Input() dmpForm: UntypedFormGroup;

  readonly contactPerson = output<any>();
  readonly contributorToAdd = output<any>();
  readonly contributorToRemove = output<any>();
  readonly contributorToUpdate = output<any>();

  readonly roles: any = ContributorRole;
  readonly identifierType = IdentifierType;
  readonly translateEnumPrefix = 'enum.contributor.role.';

  private searchTerms = new Subject<string>();
  private subscriptions: Subscription[] = [];
  private configSubscription: Subscription;

  searchResult$: Observable<SearchResult<Contributor>>;
  serviceConfig$: ServiceConfig[];
  serviceConfigType: ServiceConfig;
  isCollapsed: boolean = false;

  currentUpdateContributorIdx: number = -1;
  form = new UntypedFormGroup({
    mbox: new UntypedFormControl('', [
      notEmptyValidator(),
      Validators.maxLength(4000),
    ]),
    personId: new UntypedFormControl('', [
      orcidValidator(),
      Validators.maxLength(19),
    ]),
  });

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  ngOnInit(): void {
    setTimeout(() => {
      this.configSubscription = this.config$.subscribe(config => {
        setTimeout(() => {
          this.serviceConfig$ = config.personSearchServiceConfigs;
          this.serviceConfigType = config.personSearchServiceConfigs[0];
        });
      });

      const searchSubscription = this.searchTerms
        .pipe(debounceTime(300))
        .subscribe((term: string) => {
          this.searchResult$ = this.backendService.getPersonSearchResult(
            term,
            this.serviceConfigType.queryValue,
          );
        });
      this.subscriptions.push(searchSubscription);
    });
  }

  mbox(): UntypedFormControl {
    return this.form.controls.mbox as UntypedFormControl;
  }

  identifier(): UntypedFormControl {
    return this.form.controls.personId as UntypedFormControl;
  }

  onServiceConfigChange(serviceConfigType: ServiceConfig) {
    this.serviceConfigType = serviceConfigType;
    this.searchTerms.next(this.personSearch.currentSearchTerm);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.configSubscription.unsubscribe();
  }

  changeContactPerson(contact: Contributor): void {
    this.contactPerson.emit(contact);
  }

  addContributor(contributor: Contributor): void {
    this.contributorToAdd.emit(contributor);
  }

  triggerUpdateContributorDetails(idx: number) {
    if (this.currentUpdateContributorIdx === idx) {
      this.currentUpdateContributorIdx = -1;
    } else {
      this.currentUpdateContributorIdx = idx;
      this.form.patchValue({
        mbox: this.contributors.at(idx).value.mbox,
        personId: this.contributors.at(idx).value.personId.identifier,
      });
    }
  }

  cancelUpdateContributorDetails() {
    this.currentUpdateContributorIdx = -1;
    this.form.reset();
  }

  updateContributorDetails(idx: number) {
    if (this.form.invalid) {
      return;
    }

    const newContributor = {
      ...this.contributors.at(idx).value,
      mbox: this.form.value.mbox,
      personId: {
        identifier: this.form.value.personId,
        type: IdentifierType.ORCID,
      },
      roles: this.form.value.roles,
    };

    this.contributorToUpdate.emit({
      idx: idx,
      contributor: newContributor,
    });

    this.currentUpdateContributorIdx = -1;
    this.form.reset();
  }

  removeContributor(index: number): void {
    const contributor = (
      this.dmpForm.controls.contributors as UntypedFormArray
    ).at(index).value;
    const datasets = this.getDatasetsForContributor(contributor);
    if (!datasets.length) {
      this.contributorToRemove.emit(index);
      this.currentUpdateContributorIdx = -1;
      this.form.reset();
    } else {
      const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
        data: datasets,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.contributorToRemove.emit(index);
          this.currentUpdateContributorIdx = -1;
          this.form.reset();
        }
      });
    }
  }

  searchContributor(term: string): void {
    this.searchTerms.next(term);
    if (term.length > 0) {
      this.isCollapsed = true;
    }
  }

  get contributors(): UntypedFormArray {
    return this.dmpForm.get('contributors') as UntypedFormArray;
  }

  private getDatasetsForContributor(contributor: Contributor): Dataset[] {
    const datasets = this.dmpForm.controls.datasets.value;
    return datasets.filter(item => item.deletionPerson?.id === contributor?.id);
  }

  addAllContributors(): void {
    const filteredMembers = this.contributorFilter.filterContributors(
      this.projectMembers,
      this.dmpForm.get('contributors').value,
    );

    filteredMembers.forEach(member => {
      this.contributorToAdd.emit(member);
    });

    const remainingMembers = this.contributorFilter.filterContributors(
      this.projectMembers,
      this.dmpForm.get('contributors').value,
    );
    if (remainingMembers.length === 0) {
      this.isCollapsed = true;
    }
  }

  doesContactExist(): boolean {
    const contributors = this.dmpForm.get('contributors') as UntypedFormArray;
    return contributors.controls.some(contributor => contributor.value.contact);
  }

  onViewChange(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
  }

  toggleRecommendations(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}

@Component({
  selector: 'app-confirm-deletion-dialog',
  templateUrl: 'confirm-deletion-dialog.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    TranslatePipe,
  ],
})
export class ConfirmDeletionDialogComponent {
  data = inject(MAT_DIALOG_DATA);
}
