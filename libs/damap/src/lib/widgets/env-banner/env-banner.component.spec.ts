import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnvBannerComponent } from './env-banner.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';

describe('EnvBannerComponent', () => {
  let component: EnvBannerComponent;
  let fixture: ComponentFixture<EnvBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, TranslateTestingModule],
      declarations: [EnvBannerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
