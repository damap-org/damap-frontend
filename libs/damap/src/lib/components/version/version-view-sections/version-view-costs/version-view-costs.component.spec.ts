import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { VersionViewCostsComponent } from './version-view-costs.component';

describe('VersionViewCostsComponent', () => {
  let component: VersionViewCostsComponent;
  let fixture: ComponentFixture<VersionViewCostsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VersionViewCostsComponent],
      imports: [TranslateTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
