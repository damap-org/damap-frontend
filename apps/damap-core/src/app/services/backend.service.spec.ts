import { describe, expect, it, vi, beforeEach, afterEach, type MockedObject } from 'vitest';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEventType, HttpHeaders } from '@angular/common/http';

import { APP_ENV } from '../constants';
import { BackendService } from './backend.service';
import { Contributor } from '../domain/contributor';
import { Dmp } from '../domain/dmp';
import { EMPTY } from 'rxjs';
import { FeedbackService } from './feedback.service';
import { Project } from '../domain/project';
import { SearchResult } from '../domain/search/search-result';
import { TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from '../testing/translate-testing/translate-testing.module';
import { closedDatasetMock } from '../mocks/dataset-mocks';
import { completeDmp } from '../mocks/dmp-mocks';
import { mockAccess } from '../mocks/access-mocks';
import { mockProject } from '../mocks/project-mocks';
import { mockProjectSearchResult } from '../mocks/search';

describe('BackendService', () => {
  let service: BackendService;
  let httpTestingController: HttpTestingController;
  const backendUrl = APP_ENV.backendurl;

  beforeEach(() => {
    const spy = {
      error: vi.fn().mockName('FeedbackService.error'),
      success: vi.fn().mockName('FeedbackService.success'),
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateTestingModule],
      providers: [{ provide: FeedbackService, useValue: spy }],
    });
    service = TestBed.inject(BackendService);
    TestBed.inject(FeedbackService) as MockedObject<FeedbackService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve dmp for user', () => {
    service.getDmpById(0).subscribe((dmp: Dmp) => {
      expect(dmp).toBeTruthy();

      expect(dmp.id).toBe(1);
    });

    const req = httpTestingController.expectOne(`${backendUrl}dmps/0`);
    req.flush({ id: 1, project: { title: 'Random Dmp' } });
  });

  it('should get all accesses for dmp', () => {
    service.getAccess(completeDmp.id).subscribe((accesses) => {
      expect(accesses).toBeTruthy();
      expect(accesses.length).toBe(1);
    });

    const req = httpTestingController.expectOne(`${backendUrl}access/dmps/${completeDmp.id}`);
    req.flush([mockAccess]);
  });

  it('should create access', () => {
    service.createAccess(mockAccess).subscribe((access) => expect(access).toBeTruthy());

    const req = httpTestingController.expectOne(`${backendUrl}access`);
    req.flush(mockAccess);
  });

  it('should delete access', () => {
    service.deleteAccess(mockAccess.id).subscribe((access) => expect(access).toBe(EMPTY));

    const req = httpTestingController.expectOne(`${backendUrl}access/${mockAccess.id}`);
    req.flush(EMPTY);
  });

  it('should get all suggested projects', () => {
    service.getProjectSearchResult('').subscribe((searchResult: SearchResult<Project>) => {
      expect(searchResult).toBeTruthy();
      expect(searchResult.items).toBeTruthy();
      expect(searchResult.items.length).toBe(1);

      const project = searchResult.items[0];
      expect(project.title).toBe(mockProject.title);
    });

    const req = httpTestingController.expectOne(`${backendUrl}projects?q=`);
    req.flush(mockProjectSearchResult);
  });

  it('should get all project members', () => {
    service.getProjectMembers(1234).subscribe((projectsMember: Contributor[]) => {
      expect(projectsMember).toBeTruthy();
      expect(projectsMember.length).toBe(1);

      const member = projectsMember[0];
      expect(member.roleInProject).toBe('Random member');
    });

    const req = httpTestingController.expectOne(`${backendUrl}projects/1234/staff`);
    req.flush([
      {
        person: [{ id: null, universityId: 1234 }],
        roleInProject: 'Random member',
      },
    ]);
  });

  it('should upload file for analysis', () => {
    const mockFile = new FormData();
    mockFile.append('file', new Blob());
    service.analyseFileData(mockFile).subscribe((response) => {
      if (response.type === HttpEventType.UploadProgress) {
        expect(response.loaded).toEqual(7);
        expect(response.total).toEqual(10);
      }
      if (response.type === HttpEventType.Response) {
        expect(response.body.title).toEqual('file');
      }
    });

    const req = httpTestingController.expectOne(`${backendUrl}file-analysis/examine`);
    expect(req.request.method).toEqual('POST');
    req.event({ type: HttpEventType.UploadProgress, loaded: 7, total: 10 });
    req.event({
      type: HttpEventType.Response,
      body: { title: 'file' },
      status: 200,
      headers: new HttpHeaders(),
      statusText: 'OK',
      url: '',
      ok: true,
      clone: null,
    });
  });

  it('should search dataset by doi', () => {
    const doi = '10.1234/test';
    service.searchDataset(doi).subscribe((value) => {
      expect(value).toBeTruthy();
      expect(value).toBe(closedDatasetMock);
    });

    const req = httpTestingController.expectOne(`${backendUrl}openaire?doi=${doi}`);
    expect(req.request.method).toBe('GET');
    req.flush(closedDatasetMock);
  });

  it('should retrieve GDPR data', () => {
    service.getGdpr().subscribe((gdpr) => {
      expect(gdpr).toBeTruthy();
      expect(gdpr.length).toBe(1);

      const consent = gdpr.find((item) => item.entity === 'Consent');
      expect(consent.entries.length).toBe(1);
    });

    const req = httpTestingController.expectOne(`${backendUrl}gdpr/extended`);
    req.flush([{ entity: 'Consent', entries: [{ consentGiven: 'true' }] }]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
