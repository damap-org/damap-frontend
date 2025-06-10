import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { MatTooltipHarness } from '@angular/material/tooltip/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TooltipComponent } from './tooltip.component';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let loader: HarnessLoader;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatTooltipModule, NoopAnimationsModule, TranslateTestingModule],
      declarations: [TooltipComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    component.tooltip = 'placeholder';
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all tooltip harnesses', waitForAsync(async () => {
    const tooltips = await loader.getAllHarnesses(MatTooltipHarness);
    expect(tooltips.length).toBe(1);
  }));

  it('should be able to show and hide a tooltip', waitForAsync(async () => {
    const tooltip = await loader.getHarness(MatTooltipHarness);
    expect(await tooltip.isOpen()).toBe(false);
    await tooltip.show();
    expect(await tooltip.isOpen()).toBe(true);
    await tooltip.hide();
    expect(await tooltip.isOpen()).toBe(false);
  }));

  it('should be able to get the text of a tooltip', waitForAsync(async () => {
    const tooltip = await loader.getHarness(MatTooltipHarness);
    await tooltip.show();
    expect(await tooltip.getTooltipText()).toBe('placeholder');
  }));

  it('should return empty when getting the tooltip text while closed', waitForAsync(async () => {
    const tooltip = await loader.getHarness(MatTooltipHarness);
    expect(await tooltip.getTooltipText()).toBe('');
  }));
});
