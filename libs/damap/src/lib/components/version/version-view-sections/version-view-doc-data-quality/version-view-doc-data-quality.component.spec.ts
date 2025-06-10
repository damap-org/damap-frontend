import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { VersionViewDocDataQualityComponent } from './version-view-doc-data-quality.component';

describe('VersionViewDocDataQualityComponent', () => {
  let component: VersionViewDocDataQualityComponent;
  let fixture: ComponentFixture<VersionViewDocDataQualityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VersionViewDocDataQualityComponent],
      imports: [TranslateTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewDocDataQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
