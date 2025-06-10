import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { TreeSelectFormFieldComponent } from './tree-select-form-field.component';

describe('TreeSelectFormFieldComponent', () => {
  let component: TreeSelectFormFieldComponent;
  let fixture: ComponentFixture<TreeSelectFormFieldComponent>;
  let loader: HarnessLoader;
  let input: MatInputHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatChipsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatTreeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        TranslateTestingModule,
        NoopAnimationsModule,
      ],
      declarations: [TreeSelectFormFieldComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TreeSelectFormFieldComponent);
    component = fixture.componentInstance;
    component.label = 'Filter';
    component.treeData = [
      {
        id: 'tree',
        label: 'Tree',
        children: [
          {
            id: 'node',
            label: 'Node',
            children: [{ id: 'leaf', label: 'Leaf' }],
          },
          { id: 'nodeWithOutChild', label: 'Node without child' },
        ],
      },
    ];
    // state = [{id:'node', label:'Node'}]
    component.state = [
      {
        id: component.treeData[0].children[0].id,
        label: component.treeData[0].children[0].label,
      },
    ];
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain input field', async () => {
    input = await loader.getHarness(MatInputHarness);
    expect(input).toBeTruthy();
  });

  it('should check preselected options', async () => {
    spyOn(component.params, 'emit');

    // wait for the tree to be rendered
    input = await loader.getHarness(MatInputHarness);

    expect(component.params.emit).toHaveBeenCalledWith(component.state);
  });
});
