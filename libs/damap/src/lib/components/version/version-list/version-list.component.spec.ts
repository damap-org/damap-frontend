import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthService } from '../../../auth/auth.service';
import { BackendService } from '../../../services/backend.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DmpStore } from '../../../data-access/dmp.store';
import { RouterModule } from '@angular/router';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { VersionListComponent } from './version-list.component';
import { completeDmp } from '../../../mocks/dmp-mocks';
import { of } from 'rxjs';

describe('VersionListComponent', () => {
  let component: VersionListComponent;
  let fixture: ComponentFixture<VersionListComponent>;
  let backendSpy;
  let dmpStoreSpy;
  const authSpy = jasmine.createSpyObj('AuthService', ['isAdmin']);

  beforeEach(waitForAsync(() => {
    authSpy.isAdmin.and.returnValue(false);
    backendSpy = jasmine.createSpyObj('BackendService', ['getDmpVersions']);
    backendSpy.getDmpVersions.and.returnValue(of([]));
    dmpStoreSpy = jasmine.createSpyObj('DmpStore', ['loadDmps', 'dmpById']);
    dmpStoreSpy.dmpById.and.returnValue(completeDmp);
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        TranslateTestingModule,
        VersionListComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: BackendService, useValue: backendSpy },
        { provide: DmpStore, useValue: dmpStoreSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
