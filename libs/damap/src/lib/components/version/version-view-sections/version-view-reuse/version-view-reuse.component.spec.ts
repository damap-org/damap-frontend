import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { VersionViewReuseComponent } from './version-view-reuse.component';

describe('VersionViewReuseComponent', () => {
  let component: VersionViewReuseComponent;
  let fixture: ComponentFixture<VersionViewReuseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VersionViewReuseComponent],
      imports: [TranslateTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewReuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
