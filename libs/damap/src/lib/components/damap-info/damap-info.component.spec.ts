import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamapInfoComponent } from './damap-info.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('DamapInfoComponent', () => {
  let component: DamapInfoComponent;
  let fixture: ComponentFixture<DamapInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DamapInfoComponent,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatDividerModule,
        MatExpansionModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DamapInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
