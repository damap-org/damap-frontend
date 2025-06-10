import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { VersionViewLegalEthicalAspectsComponent } from './version-view-legal-ethical-aspects.component';

describe('VersionViewLegalEthicalAspectsComponent', () => {
  let component: VersionViewLegalEthicalAspectsComponent;
  let fixture: ComponentFixture<VersionViewLegalEthicalAspectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VersionViewLegalEthicalAspectsComponent],
      imports: [TranslateTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewLegalEthicalAspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
