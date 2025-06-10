import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivePreviewComponent } from './live-preview.component';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('LivePreviewComponent', () => {
  let component: LivePreviewComponent;
  let fixture: ComponentFixture<LivePreviewComponent>;

  beforeEach(async () => {
    const matDialogRefMock = {
      close: jasmine.createSpy('close'),
      afterClosed: () => of(true),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [LivePreviewComponent],
      providers: [{ provide: MatDialogRef, useValue: matDialogRefMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LivePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
