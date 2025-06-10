import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

@Component({
  selector: 'app-dmp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit, OnDestroy {
  @ViewChild(PersonSearchComponent) personSearch: PersonSearchComponent;

  @Input() config$: Observable<Config>;
  @Input() projectMembers: Contributor[];
  @Input() dmpForm: UntypedFormGroup;

  @Output() contactPerson = new EventEmitter<any>();
  @Output() contributorToAdd = new EventEmitter<any>();
  @Output() contributorToRemove = new EventEmitter<any>();
  @Output() contributorToUpdate = new EventEmitter<any>();

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

  constructor(
    private backendService: BackendService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.configSubscription = this.config$.subscribe(config => {
        setTimeout(() => {
          this.serviceConfig$ = config.personSearchServiceConfigs;
          this.serviceConfigType = config.personSearchServiceConfigs[0];
          this.cdr.detectChanges();
        });
      });

      const searchSubscription = this.searchTerms
        .pipe(debounceTime(300))
        .subscribe((term: string) => {
          this.searchResult$ = this.backendService.getPersonSearchResult(
            term,
            this.serviceConfigType.displayText,
          );
        });
      this.subscriptions.push(searchSubscription);
    });
    this.contactContributor();
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
    this.contactContributor();
    this.isCollapsed = true;
  }

  addContributor(contributor: Contributor): void {
    this.contributorToAdd.emit(contributor);
    this.contactContributor();
    this.isCollapsed = true;
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
    this.contactContributor();
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

  contactContributor(): number {
    let contributors = this.dmpForm.get('contributors') as UntypedFormArray;
    return contributors.controls.findIndex(
      (contributor, index) => contributor.value.contact,
    );
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
})
export class ConfirmDeletionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Dataset[]) {}
}
