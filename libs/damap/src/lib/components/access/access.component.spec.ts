import { ActivatedRoute, RouterModule } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';

import { AccessComponent } from './access.component';
import { BackendService } from '../../services/backend.service';
import { InfoMessageModule } from '../../widgets/info-message/info-message.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PersonCardComponent } from '../../widgets/person-card/person-card.component';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { completeDmp } from '../../mocks/dmp-mocks';
import { mockAccess } from '../../mocks/access-mocks';

describe('AccessComponent', () => {
  let component: AccessComponent;
  let fixture: ComponentFixture<AccessComponent>;
  let backendSpy;

  beforeEach(waitForAsync(() => {
    backendSpy = jasmine.createSpyObj('BackendService', [
      'getDmpById',
      'getAccess',
      'createAccess',
      'deleteAccess',
    ]);
    backendSpy.getDmpById.and.returnValue(of([completeDmp]));
    backendSpy.getAccess.and.returnValue(of([mockAccess]));

    TestBed.configureTestingModule({
      imports: [
        AccessComponent,
        TranslateTestingModule,
        PersonCardComponent,
        InfoMessageModule,
        RouterModule.forRoot([]),
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: BackendService, useValue: backendSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (id: number) => mockAccess.dmpId } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create editor', () => {
    backendSpy.createAccess.and.returnValue(of(mockAccess));
    const $event = new MatCheckboxChange();
    $event.checked = true;
    component.editorToggle($event, mockAccess);
    expect(backendSpy.createAccess).toHaveBeenCalledTimes(1);
  });

  it('should delete editor', () => {
    backendSpy.deleteAccess.and.returnValue(EMPTY);
    const $event = new MatCheckboxChange();
    $event.checked = false;
    component.editorToggle($event, mockAccess);
    expect(backendSpy.deleteAccess).toHaveBeenCalledOnceWith(mockAccess.id);
  });
});
