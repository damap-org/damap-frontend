import { describe, expect, it, vi, beforeEach, type MockedObject } from 'vitest';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { SummaryComponent } from './summary.component';
import { TranslateTestingModule } from '@damap-frontend-core';
import { BackendService } from '@damap-frontend-core';
import { Benchmark } from '../../../domain/benchmark';
import { of } from 'rxjs';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let backendSpy: Partial<MockedObject<BackendService>>;

  beforeEach(waitForAsync(() => {
    backendSpy = {
      loadServiceConfig: vi.fn().mockName('BackendService.loadServiceConfig'),
      getBenchmarks: vi.fn().mockName('BackendService.getBenchmarks'),
    };
    backendSpy.loadServiceConfig.mockReturnValue(of({ evaluationAvailable: true } as any));
    backendSpy.getBenchmarks.mockReturnValue(of([]));

    TestBed.configureTestingModule({
      imports: [MatTableModule, MatProgressBarModule, TranslateTestingModule],
      declarations: [SummaryComponent],
      providers: [{ provide: BackendService, useValue: backendSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should default to the FWF benchmark if it exists', () => {
    backendSpy.getBenchmarks.mockReturnValue(
      of([
        { identifier: 'bench-2', title: 'Benchmark 2' },
        { identifier: '69ef5cdfcde500798dbd1af8', title: 'FWF Benchmark' },
      ] as Benchmark[]),
    );
    fixture.detectChanges();
    expect(component.selectedBenchmarkId()).toBe('69ef5cdfcde500798dbd1af8');
  });

  it('should fallback to the first benchmark if FWF benchmark does not exist', () => {
    backendSpy.getBenchmarks.mockReturnValue(
      of([
        { identifier: 'bench-2', title: 'Benchmark 2' },
        { identifier: 'bench-3', title: 'Benchmark 3' },
      ] as Benchmark[]),
    );
    fixture.detectChanges();
    expect(component.selectedBenchmarkId()).toBe('bench-2');
  });
});
