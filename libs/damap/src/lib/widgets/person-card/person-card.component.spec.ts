import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrcidModule } from '../orcid/orcid.module';
import { PersonCardComponent } from './person-card.component';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { mockContributor1 } from '../../mocks/contributor-mocks';

describe('PersonCardComponent', () => {
  let component: PersonCardComponent;
  let fixture: ComponentFixture<PersonCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        PersonCardComponent,
        TranslateTestingModule,
        MatCardModule,
        MatIconModule,
        OrcidModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonCardComponent);
    component = fixture.componentInstance;
    component.person = mockContributor1;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
