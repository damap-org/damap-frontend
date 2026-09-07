import { ActivatedRoute, RouterModule } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { EMPTY, of } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AccessComponent } from './access.component';
import { BackendService } from '../../services/backend.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PersonCardComponent } from '../../widgets/person-card/person-card.component';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { completeDmp } from '../../mocks/dmp-mocks';
import { mockAccess } from '../../mocks/access-mocks';
import { MatRadioChange } from '@angular/material/radio';

describe('AccessComponent', () => {
  let component: AccessComponent;
  let fixture: ComponentFixture<AccessComponent>;
  let backendSpy;

  beforeEach(waitForAsync(() => {
    backendSpy = {
      getDmpById: vi.fn().mockName('BackendService.getDmpById'),
      getAccess: vi.fn().mockName('BackendService.getAccess'),
      createAccess: vi.fn().mockName('BackendService.createAccess'),
      deleteAccess: vi.fn().mockName('BackendService.deleteAccess'),
    };
    backendSpy.getDmpById.mockReturnValue(of([completeDmp]));
    backendSpy.getAccess.mockReturnValue(of([mockAccess]));

    TestBed.configureTestingModule({
      imports: [
        AccessComponent,
        TranslateTestingModule,
        PersonCardComponent,
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
    backendSpy.createAccess.mockReturnValue(of(mockAccess));
    const $event = {
      value: mockAccess,
    } as MatRadioChange;
    component.toggleAccess($event, mockAccess);
    expect(backendSpy.createAccess).toHaveBeenCalledTimes(1);
  });

  it('should delete editor', () => {
    backendSpy.deleteAccess.mockReturnValue(EMPTY);
    const $event = {
      value: mockAccess,
    } as MatRadioChange;
    component.toggleAccess($event, mockAccess);
    expect(backendSpy.deleteAccess).toHaveBeenCalledTimes(1);
    expect(backendSpy.deleteAccess).toHaveBeenCalledWith(mockAccess.id);
  });
});
