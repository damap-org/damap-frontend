import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmpInstructionsComponent } from './dmp-instructions.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DmpInstructionsComponent', () => {
  let component: DmpInstructionsComponent;
  let fixture: ComponentFixture<DmpInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        DmpInstructionsComponent,
        TranslateModule.forRoot(),
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatDividerModule,
        MatExpansionModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DmpInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should move to the next step', () => {
    component.nextStep();
    expect(component.step()).toBe(1);
  });

  it('should move to the preious step', () => {
    component.nextStep();
    component.nextStep();
    component.prevStep();
    expect(component.step()).toBe(1);
  });
});
