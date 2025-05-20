import { BehaviorSubject, of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {
  configMockData,
  serviceConfigMockData,
} from '../../../mocks/config-service-mocks';
import {
  mockContact,
  mockContributor1,
} from '../../../mocks/contributor-mocks';

import { BackendService } from '../../../services/backend.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

  beforeEach(waitForAsync(() => {
    backendSpy = jasmine.createSpyObj('BackendService', [
      'getPersonSearchResult',
    ]);
    backendSpy.getPersonSearchResult.and.returnValue(
      of(mockContributorSearchResult),
    );

    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule,
        NoopAnimationsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [PeopleComponent, ContributorFilterPipe],
      providers: [{ provide: BackendService, useValue: backendSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    createComponent();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    component.config$ = new BehaviorSubject<Config>(configMockData);
    component.dmpForm = new UntypedFormGroup({
      datasets: new UntypedFormArray([]),
      contributors: new UntypedFormArray([
        new UntypedFormGroup({
          role: new UntypedFormControl(undefined),
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
    it('should load service config and set serviceConfigType to the first one', () => {
      component.ngOnInit();
      expect(component.serviceConfig$).toEqual(serviceConfigMockData);
      expect(component.serviceConfigType).toEqual(serviceConfigMockData[0]);
    });
  });

  it('should update serviceConfigType when a service option is selected', waitForAsync(async () => {
    spyOn(component, 'onServiceConfigChange').and.callThrough();

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

    await orcidOption.click();
    fixture.detectChanges();

    expect(component.serviceConfigType).toEqual(serviceConfigMockData[1]);
  }));

  it('should emit contact', () => {
    spyOn(component.contactPerson, 'emit');
    component.isCollapsed = false;

    component.changeContactPerson(mockContact);
    expect(component.contactPerson.emit).toHaveBeenCalledOnceWith(mockContact);
  });

  it('should emit contributor to add', () => {
    spyOn(component.contributorToAdd, 'emit');
    component.isCollapsed = false;

    component.addContributor(mockContributor1);
    expect(component.contributorToAdd.emit).toHaveBeenCalledOnceWith(
      mockContributor1,
    );
  });

  it('should remove contributor from dataset and emit change', () => {
    spyOn(component.contributorToRemove, 'emit');

    component.removeContributor(0);
    expect(component.contributorToRemove.emit).toHaveBeenCalledOnceWith(0);
  });

  it('should add all recommended contributors', () => {
    spyOn(component.contributorToAdd, 'emit');
    component.projectMembers = [mockContributor1, mockContact];

    component.addAllContributors();

    expect(component.contributorToAdd.emit).toHaveBeenCalledWith(
      mockContributor1,
    );
    expect(component.contributorToAdd.emit).toHaveBeenCalledWith(mockContact);
  });

  it('should collapse panel after adding all contributors', () => {
    component.projectMembers = [mockContributor1];
    component.isCollapsed = false;

    component.addAllContributors();
    fixture.detectChanges();

    expect(component.isCollapsed).toBeTrue();
  });

  describe('getFilteredMembers', () => {
    it('should return empty array when projectMembers is null', () => {
      component.projectMembers = null;
      expect(component['getFilteredMembers']()).toEqual([]);
    });

    it('should return empty array when dmpForm is null', () => {
      component.projectMembers = [mockContributor1];
      component.dmpForm = null;
      expect(component['getFilteredMembers']()).toEqual([]);
    });

    it('should filter out already added contributors', () => {
      component.projectMembers = [mockContributor1, mockContact];
      component.dmpForm = new UntypedFormGroup({
        contributors: new UntypedFormArray([
          new UntypedFormGroup({
            universityId: new UntypedFormControl(mockContributor1.universityId),
            personId: new UntypedFormControl(mockContributor1.personId),
            mbox: new UntypedFormControl(mockContributor1.mbox),
          }),
        ]),
      });

      const filteredMembers = component['getFilteredMembers']();
      expect(filteredMembers).toEqual([mockContact]);
    });

    it('should return all project members when no contributors are added', () => {
      component.projectMembers = [mockContributor1, mockContact];
      component.dmpForm = new UntypedFormGroup({
        contributors: new UntypedFormArray([]),
      });

      const filteredMembers = component['getFilteredMembers']();
      expect(filteredMembers).toEqual([mockContributor1, mockContact]);
    });
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
            personId: new UntypedFormControl({ identifier: '123' }),
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
          mbox: '',
          personId: '',
        });
      });
    });

    describe('updateContributorDetails', () => {
      it('should not update if form is invalid', () => {
        component.form.get('mbox').setErrors({ required: true });
        spyOn(component.contributorToUpdate, 'emit');

        component.updateContributorDetails(0);

        expect(component.contributorToUpdate.emit).not.toHaveBeenCalled();
      });

      it('should emit updated contributor details when form is valid', () => {
        component.currentUpdateContributorIdx = 0;
        component.form.patchValue({
          mbox: 'new@example.com',
          personId: '456',
        });
        spyOn(component.contributorToUpdate, 'emit');

        component.updateContributorDetails(0);

        expect(component.contributorToUpdate.emit).toHaveBeenCalledWith({
          index: 0,
          contributor: {
            mbox: 'new@example.com',
            personId: { identifier: '456' },
          },
        });
        expect(component.currentUpdateContributorIdx).toBe(-1);
        expect(component.form.value).toEqual({
          mbox: '',
          personId: '',
        });
      });
    });
  });
});
