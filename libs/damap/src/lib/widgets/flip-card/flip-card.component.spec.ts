import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { FlipCardComponent } from './flip-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';

describe('FlipCardComponent', () => {
  let component: FlipCardComponent;
  let fixture: ComponentFixture<FlipCardComponent>;
  let routerSpy;

  beforeEach(waitForAsync(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [FlipCardComponent],
      imports: [
        RouterModule,
        TranslateTestingModule,
        MatCardModule,
        MatIconModule,
      ],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the provided route', () => {
    component.navigateRoute = '/damap';
    component.navigateTo();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/damap']);
  });

  it('should not navigate if navigateRoute is undefined', () => {
    component.navigateRoute = undefined;
    component.navigateTo();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should call navigateTo when Enter key is pressed', () => {
    const navigateSpy = spyOn(component, 'navigateTo');
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    component.onKeyPress(event);
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should call navigateTo when Space key is pressed', () => {
    const navigateSpy = spyOn(component, 'navigateTo');
    const event = new KeyboardEvent('keypress', { key: ' ' });
    component.onKeyPress(event);
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should not call navigateTo when other keys are pressed', () => {
    const navigateSpy = spyOn(component, 'navigateTo');
    const event = new KeyboardEvent('keypress', { key: 'A' });
    component.onKeyPress(event);
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
