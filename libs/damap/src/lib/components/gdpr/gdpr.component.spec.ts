import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BackendService } from '../../services/backend.service';
import { GdprComponent } from './gdpr.component';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';

describe('GdprComponent', () => {
  let component: GdprComponent;
  let fixture: ComponentFixture<GdprComponent>;
  let backendSpy;

  beforeEach(waitForAsync(() => {
    backendSpy = jasmine.createSpyObj('BackendService', ['getGdpr']);
    TestBed.configureTestingModule({
      imports: [GdprComponent, TranslateTestingModule],
      providers: [{ provide: BackendService, useValue: backendSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(GdprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
