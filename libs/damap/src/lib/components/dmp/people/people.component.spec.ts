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

    component.changeContactPerson(mockContact);
    expect(component.contactPerson.emit).toHaveBeenCalledOnceWith(mockContact);
  });

  it('should emit contributor to add', () => {
    spyOn(component.contributorToAdd, 'emit');

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
});
