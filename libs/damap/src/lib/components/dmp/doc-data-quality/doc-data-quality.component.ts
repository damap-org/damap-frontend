import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DataQualityType } from '../../../domain/enum/data-quality-type.enum';

@Component({
  selector: 'app-dmp-doc-data-quality',
  templateUrl: './doc-data-quality.component.html',
  styleUrls: ['./doc-data-quality.component.css'],
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
