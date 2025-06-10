import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  selectForm,
  selectFormContact,
} from '../../../store/selectors/form.selectors';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { SummaryComponent } from './summary.component';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { completeDmp } from '../../../mocks/dmp-mocks';
import { mockContact } from '../../../mocks/contributor-mocks';
import { provideMockStore } from '@ngrx/store/testing';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  const initialState = {
    form: { dmp: null, changed: false },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, MatProgressBarModule, TranslateTestingModule],
      declarations: [SummaryComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectForm, value: completeDmp },
            { selector: selectFormContact, value: mockContact },
          ],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
