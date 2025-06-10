import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoCardComponent } from './info-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

describe('InfoCardComponent', () => {
  let component: InfoCardComponent;
  let fixture: ComponentFixture<InfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule.forRoot(),
        InfoCardComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCardComponent);
    component = fixture.componentInstance;

    component.infoLabel = {
      stepNumber: 1,
      instructions: 'Test instructions',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the card', () => {
    component.closeIntro();
    expect(component.isIntroShow).toBeFalse();
  });

  it('should open the card', () => {
    component.openIntro();
    expect(component.isIntroShow).toBeTrue();
  });

  it('should setIcon info in teh card', () => {
    component.infoLabel = {};
    component.setContentCard();
    expect(component.icon).toBe('info');
  });

  it('should call the onchange method ', () => {
    component.ngOnChanges();
    expect(component.icon).toBe(1);
  });
});
