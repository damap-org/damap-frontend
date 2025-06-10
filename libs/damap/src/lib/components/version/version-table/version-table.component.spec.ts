import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VersionTableComponent } from './version-table.component';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';

describe('VersionTableComponent', () => {
  let component: VersionTableComponent;
  let fixture: ComponentFixture<VersionTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [VersionTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
