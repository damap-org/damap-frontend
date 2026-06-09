import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataQualityType } from '../../../domain/enum/data-quality-type.enum';
import { KeyValuePipe } from '@angular/common';
import { MatLabel, MatHint, MatFormField } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { TextareaWrapperComponent } from '../../../shared/textarea-wrapper/textarea-wrapper.component';
import { TooltipComponent } from '../../../widgets/tooltip/tooltip.component';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../../testing/translate-testing/translate-testing.module';

@Component({
    selector: 'app-dmp-doc-data-quality',
    templateUrl: './doc-data-quality.component.html',
    styleUrls: ['./doc-data-quality.component.css'],
    imports: [
    MatLabel,
    MatCard,
    MatCardContent,
    TextareaWrapperComponent,
    TooltipComponent,
    MatHint,
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    KeyValuePipe,
    TranslateModule,
    TranslatePipeMock
],
})
export class DocDataQualityComponent {
  @Input() docDataStep: UntypedFormGroup;

  optionsMetadata: string[] = [
    'We will be using the following domain specific metadata standards:…',
    'As there are no domain specific metadata standards applicable, we will provide a README file with an explanation of all values and terms used [at file level/at dataset level/at project level]',
  ];
  optionsDataGeneration: string[] = [
    'Specific software will be used to process the raw data',
    'Specific software will be used to conduct statistics',
    'Specific software will be used to create graphical representations',
    'Specific software will be used to make drawings',
  ];
  optionsStructureAndVersioning: string[] = [
    'The filenames will follow the projects naming convention as defined in [add document name] and include a timestamp of creation. Version control is automated.',
    'The respective work package leader will handle the structure and versioning of the research data.',
  ];

  readonly translateDataQualityPrefixEnum = 'enum.dataquality.';
  readonly dataQualityOptions: any = DataQualityType;

  originalOrder = (): number => 0;

  get metadata(): UntypedFormControl {
    return this.docDataStep.get('metadata') as UntypedFormControl;
  }

  get documentation(): UntypedFormControl {
    return this.docDataStep.get('documentation') as UntypedFormControl;
  }

  get structure(): UntypedFormControl {
    return this.docDataStep.get('structure') as UntypedFormControl;
  }

  get isOtherDataQualitySelected() {
    return this.docDataStep.controls.dataQuality.value?.includes(
      DataQualityType.OTHERS,
    );
  }

  get otherDataQuality(): UntypedFormControl {
    return this.docDataStep.get('otherDataQuality') as UntypedFormControl;
  }
}
