import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoMessageComponent } from './info-message.component';

describe('InfoMessageComponent', () => {
  let component: InfoMessageComponent;
  let fixture: ComponentFixture<InfoMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InfoMessageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
