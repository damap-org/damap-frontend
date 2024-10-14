import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  mockContributor1,
  mockContributor2,
} from '../../mocks/contributor-mocks';

import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectionListHarness } from '@angular/material/list/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PersonSearchComponent } from './person-search.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { SearchFieldComponent } from '../../shared/search-field/search-field.component';

describe('PersonSearchComponent', () => {
  let component: PersonSearchComponent;
  let fixture: ComponentFixture<PersonSearchComponent>;
  let loader: HarnessLoader;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        NoopAnimationsModule,
      ],
      declarations: [PersonSearchComponent, SearchFieldComponent],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSearchComponent);
    component = fixture.componentInstance;
    component.result = [mockContributor1, mockContributor2];
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit contributor on selection', waitForAsync(async () => {
    spyOn(component.personToAdd, 'emit');

    const inputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement;
    inputElement.value = mockContributor1.firstName;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const selectionList = await loader.getHarness(MatSelectionListHarness);
    const options = await selectionList.getItems();
    expect(options.length).toBe(2);

    await options[0].select();
    expect(component.personToAdd.emit).toHaveBeenCalledWith(mockContributor1);
  }));

  it('should clear results when input is empty', waitForAsync(async () => {
    spyOn(component.termToSearch, 'emit');

    const inputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement;
    inputElement.value = 'Some text';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const itemList = await loader.getHarness(MatSelectionListHarness);
    let options = await itemList.getItems();
    expect(options.length).toBe(2);

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    options = await itemList.getItems();
    expect(options.length).toBe(2);
    expect(component.result.length).toBe(0);
  }));
});
