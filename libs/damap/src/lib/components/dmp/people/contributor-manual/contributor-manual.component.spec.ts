import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';

import { ContributorManualComponent } from './contributor-manual.component';
import { IdentifierType } from '../../../../domain/enum/identifier-type.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';

describe('ContributorManualComponent', () => {
  let component: ContributorManualComponent;
  let fixture: ComponentFixture<ContributorManualComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
        TranslateTestingModule,
      ],
      declarations: [ContributorManualComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have orcid set after form reset', () => {
    component.form.setValue({
      firstName: 'abc',
      lastName: 'def',
      mbox: 'john.doe@email.com',
      personId: {
        type: IdentifierType.ORCID,
        identifier: '1234',
      },
    });
    component.resetForm();
    expect(
      (component.form.controls.personId as UntypedFormGroup).controls.type
        .value,
    ).toBe(IdentifierType.ORCID);
  });
});
