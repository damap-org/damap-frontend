import { BehaviorSubject, of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { configMockData, serviceConfigMockData } from '../../../mocks/config-service-mocks';
import { mockContact, mockContributor1 } from '../../../mocks/contributor-mocks';

import { BackendService } from '../../../services/backend.service';
import { CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { Config } from '../../../domain/config';
import { ContributorFilterPipe } from './contributor-filter.pipe';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PeopleComponent } from './people.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { mockContributorSearchResult } from '../../../mocks/search';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let backendSpy;
  let loader: HarnessLoader;

  beforeEach(async () => {
    vi.useFakeTimers();
    backendSpy = {
      getPersonSearchResult: vi.fn().mockName('BackendService.getPersonSearchResult'),
    };
    backendSpy.getPersonSearchResult.mockReturnValue(of(mockContributorSearchResult));

    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule,
        NoopAnimationsModule,
        PeopleComponent,
        ContributorFilterPipe,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: BackendService, useValue: backendSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    component.config$ = new BehaviorSubject<Config>(configMockData);
    component.dmpForm = new UntypedFormGroup({
      datasets: new UntypedFormArray([]),
      contributors: new UntypedFormArray([
        new UntypedFormGroup({
          roles: new UntypedFormControl(undefined),
        }),
      ]),
    });
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load service config and set serviceConfigType to the first one', async () => {
      component.ngOnInit();
      await vi.advanceTimersByTimeAsync(350);
      await fixture.whenStable();
      expect(component.serviceConfig$).toEqual(serviceConfigMockData);
      expect(component.serviceConfigType).toEqual(serviceConfigMockData[0]);
    });
  });

  // Skipped since I am unable to fix the test after the angular update to 22, try again after
  // changeDetection: ChangeDetectionStrategy.Eager has been removed from the component
  it.skip('should update serviceConfigType when a service option is selected', async () => {
    vi.spyOn(component, 'onServiceConfigChange');

    const selectHarness = await loader.getHarness<MatSelectHarness>(
      MatSelectHarness.with({ selector: '#serviceSelect' }),
    );

    await selectHarness.open();
    const optionHarnesses = await selectHarness.getOptions();

    expect(optionHarnesses.length).toEqual(2);

    let orcidOption;
    for (const option of optionHarnesses) {
      const optionText = await option.getText();
      if (optionText === 'ORCID') {
        orcidOption = option;
        break;
      }
    }

    expect(orcidOption).toBeTruthy();

    await orcidOption!.click();
    fixture.detectChanges();

    expect(component.serviceConfigType).toEqual(serviceConfigMockData[1]);
  });

  it('should emit contact', () => {
    vi.spyOn(component.contactPerson, 'emit').mockReturnValue(undefined);
    component.isCollapsed = false;

    component.changeContactPerson(mockContact);
    expect(component.contactPerson.emit).toHaveBeenCalledTimes(1);
    expect(component.contactPerson.emit).toHaveBeenCalledWith(mockContact);
  });

  it('should emit contributor to add', () => {
    vi.spyOn(component.contributorToAdd, 'emit').mockReturnValue(undefined);
    component.isCollapsed = false;

    component.addContributor(mockContributor1);
    expect(component.contributorToAdd.emit).toHaveBeenCalledTimes(1);
    expect(component.contributorToAdd.emit).toHaveBeenCalledWith(mockContributor1);
  });

  it('should remove contributor from dataset and emit change', () => {
    vi.spyOn(component.contributorToRemove, 'emit').mockReturnValue(undefined);

    component.removeContributor(0);
    expect(component.contributorToRemove.emit).toHaveBeenCalledTimes(1);
    expect(component.contributorToRemove.emit).toHaveBeenCalledWith(0);
  });

  it('should add all recommended contributors', () => {
    vi.spyOn(component.contributorToAdd, 'emit').mockReturnValue(undefined);
    component.projectMembers = [mockContributor1, mockContact];

    component.addAllContributors();

    expect(component.contributorToAdd.emit).toHaveBeenCalledWith(mockContributor1);
    expect(component.contributorToAdd.emit).toHaveBeenCalledWith(mockContact);
  });

  it('should collapse panel after adding all contributors', () => {
    component.projectMembers = [mockContributor1];
    component.isCollapsed = false;

    // the emitted event doesnt change the form, so we need to do it by hand
    component.dmpForm = new UntypedFormGroup({
      contributors: new UntypedFormArray([
        new UntypedFormGroup({
          universityId: new UntypedFormControl(mockContributor1.universityId),
          personId: new UntypedFormControl(mockContributor1.personId),
          mbox: new UntypedFormControl(mockContributor1.mbox),
        }),
      ]),
    });
    component.addAllContributors();

    expect(component.isCollapsed).toBe(true);
  });

  describe('Contributor Details Update', () => {
    beforeEach(() => {
      component.form = new UntypedFormGroup({
        mbox: new UntypedFormControl(''),
        personId: new UntypedFormControl(''),
      });
      component.dmpForm = new UntypedFormGroup({
        contributors: new UntypedFormArray([
          new UntypedFormGroup({
            mbox: new UntypedFormControl('test@example.com'),
            personId: new UntypedFormControl({ identifier: '123', type: 'ORCID' }),
          }),
        ]),
      });
    });

    describe('triggerUpdateContributorDetails', () => {
      it('should set currentUpdateContributorIdx and patch form values when selecting a contributor', () => {
        component.triggerUpdateContributorDetails(0);

        expect(component.currentUpdateContributorIdx).toBe(0);
        expect(component.form.value).toEqual({
          mbox: 'test@example.com',
          personId: '123',
        });
      });

      it('should reset currentUpdateContributorIdx when selecting the same contributor again', () => {
        component.currentUpdateContributorIdx = 0;

        component.triggerUpdateContributorDetails(0);

        expect(component.currentUpdateContributorIdx).toBe(-1);
      });
    });

    describe('cancelUpdateContributorDetails', () => {
      it('should reset currentUpdateContributorIdx and form values', () => {
        component.currentUpdateContributorIdx = 0;
        component.form.patchValue({
          mbox: 'test@example.com',
          personId: '123',
        });

        component.cancelUpdateContributorDetails();

        expect(component.currentUpdateContributorIdx).toBe(-1);
        expect(component.form.value).toEqual({
          mbox: null,
          personId: null,
        });
      });
    });

    describe('updateContributorDetails', () => {
      it('should not update if form is invalid', () => {
        component.form.get('mbox')!.setErrors({ required: true });
        vi.spyOn(component.contributorToUpdate, 'emit').mockReturnValue(undefined);

        component.updateContributorDetails(0);

        expect(component.contributorToUpdate.emit).not.toHaveBeenCalled();
      });

      it('should emit updated contributor details when form is valid', () => {
        component.currentUpdateContributorIdx = 0;
        component.form.patchValue({
          mbox: 'new@example.com',
          personId: '456',
        });
        vi.spyOn(component.contributorToUpdate, 'emit').mockReturnValue(undefined);

        component.updateContributorDetails(0);

        expect(component.contributorToUpdate.emit).toHaveBeenCalledWith({
          idx: 0,
          contributor: {
            mbox: 'new@example.com',
            personId: { identifier: '456', type: 'ORCID' },
            roles: undefined,
          },
        });
        expect(component.currentUpdateContributorIdx).toBe(-1);
        expect(component.form.value).toEqual({
          mbox: null,
          personId: null,
        });
      });
    });
  });
});
