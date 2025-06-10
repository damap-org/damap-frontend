import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { SaveStatusComponent } from './save-status.component';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';

describe('SaveStatusComponent', () => {
  let component: SaveStatusComponent;
  let fixture: ComponentFixture<SaveStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, TranslateTestingModule],
      declarations: [SaveStatusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
