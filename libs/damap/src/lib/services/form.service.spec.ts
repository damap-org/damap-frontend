import { TestBed } from '@angular/core/testing';

import {
  UntypedFormArray,
  UntypedFormBuilder,
  FormBuilder,
} from '@angular/forms';
import { Contributor } from '../domain/contributor';
import { mockContributor1, mockContributor2 } from '../mocks/contributor-mocks';
import { completeDmp, noDataDmp } from '../mocks/dmp-mocks';
import { FormService } from './form.service';

describe('FormService', () => {
  let service: FormService;
  let formbuilder: UntypedFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UntypedFormBuilder, FormBuilder],
    });
    service = TestBed.inject(FormService);
    formbuilder = TestBed.inject(UntypedFormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(formbuilder).toBeTruthy();
  });

  it('should export the same dmp as mapped to the form', () => {
    service.mapDmpToForm(completeDmp);
    expect(service.exportFormToDmp()).toEqual(completeDmp);
    service.mapDmpToForm(noDataDmp);
    expect(service.exportFormToDmp()).toEqual(noDataDmp);
  });

  it('should add/remove/mark contributors', () => {
    let contributorFormArray = getContributorFormArray();

    // add contributor
    service.addContributorToForm(mockContributor1);
    expect(getContributorFromForm(0)).toEqual(mockContributor1);
    expect(contributorFormArray.length).toBe(1);

    // remove contributor
    service.removeContributorFromForm(0);
    expect(contributorFormArray.length).toBe(0);

    // add as contact
    service.addContributorToForm(mockContributor1);
    expect(getContributorFromForm(0)).toEqual(mockContributor1);
    service.addContributorToForm(mockContributor2, true);
    expect(contributorFormArray.length).toEqual(2);
    expect(getContributorFromForm(1)).toEqual({
      ...mockContributor2,
      contact: true,
    });

    // change contact
    service.changeContactPerson(mockContributor1);
    expect(getContributorFromForm(0)).toEqual({
      ...mockContributor1,
      contact: true,
    });
    expect(getContributorFromForm(1)).toEqual(mockContributor2);
    service.removeContributorFromForm(1);
    service.changeContactPerson(mockContributor2);
    expect(getContributorFromForm(0)).toEqual(mockContributor1);
    expect(getContributorFromForm(1)).toEqual({
      ...mockContributor2,
      contact: true,
    });
  });

  function getContributorFromForm(index: number): Contributor {
    return getContributorFormArray().at(index).getRawValue();
  }

  function getContributorFormArray() {
    return service.dmpForm.get('contributors') as UntypedFormArray;
  }
});
