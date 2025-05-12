import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-ethical-aspects',
  templateUrl: './ethical-aspects.component.html',
  styleUrls: ['./ethical-aspects.component.css'],
  standalone: false,
})
export class EthicalAspectsComponent implements OnInit {
  @Input() legalEthicalStep: UntypedFormGroup;
  @Input() ethicalReportEnabled: boolean;

  get ethicalIssuesReport(): UntypedFormControl {
    return this.legalEthicalStep.get(
      'ethicalIssuesReport',
    ) as UntypedFormControl;
  }

  ngOnInit(): void {
    this.legalEthicalStep
      .get('committeeReviewed')
      .valueChanges.subscribe(value => {
        // Set ethical Report URL to ""
        this.ethicalIssuesReport.setValue(null);
      });
  }
}
