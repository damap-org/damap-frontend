import { Component, EventEmitter, Output } from '@angular/core';
import {
  ccByNcSa,
  ccBySa,
  DataLicenses,
  LicenseDefinitions,
  odbl,
  SoftwareLicenses,
} from './license-wizard-list';
import { LicenseDetails } from '../../domain/license-details';
import { Filter, QUESTION_TREE, Step } from './license-wizard-questions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-license-wizard',
  templateUrl: './license-wizard.component.html',
  styleUrls: ['./license-wizard.component.css'],
})
export class LicenseWizardComponent {
  @Output() selectedLicense = new EventEmitter<LicenseDetails>();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(LicenseSelectorDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedLicense.emit(result);
    });
  }
}

@Component({
  selector: 'app-license-wizard-dialog',
  templateUrl: 'license-wizard-dialog.html',
  styleUrls: ['./license-wizard.component.css'],
})
export class LicenseSelectorDialogComponent {
  licenseList: LicenseDetails[] = [...LicenseDefinitions];
  softwareLicenses: LicenseDetails[] = SoftwareLicenses;
  dataLicenses = DataLicenses;

  matrix: string[] = []; // compatible software license codes
  options: LicenseDetails[][] = []; // compatible data licenses
  steps: Step[] = [QUESTION_TREE];
  searchTerm: string = '';

  constructor(public dialogRef: MatDialogRef<LicenseSelectorDialogComponent>) {}

  searchChange(searchInput: string) {
    this.searchTerm = searchInput;
  }

  setNextStep(
    currentIndex: number,
    next: {
      step: (license: Iterable<LicenseDetails>, option?: string) => Step;
      filter?: Filter;
    },
  ) {
    if (next.filter?.licenses) {
      this.licenseList = next.filter.licenses;
    }

    // filter first
    this.filterByCategory(next.filter?.include, next.filter?.exclude);

    if (this.matrix.length) {
      this.softwareLicenseCompatibility();
      this.matrix = [];
    }
    if (this.options.length) {
      this.steps.push(
        next.step(this.licenseList, this.dataLicenseCompatibility()),
      );
      this.options = [];
      return;
    }
    this.steps.push(next.step(this.licenseList));
  }

  changeLicenseMatrix(licenseCode: string) {
    if (this.matrix.find(item => item === licenseCode) === undefined) {
      this.matrix.push(licenseCode);
    } else {
      this.matrix = this.matrix.filter(item => item !== licenseCode);
    }
  }

  changeLicenseOptions(i: number) {
    if (
      this.options.find(item => item === this.dataLicenses[i]) === undefined
    ) {
      this.options.push(this.dataLicenses[i]);
    } else {
      this.options = this.options.filter(item => item !== this.dataLicenses[i]);
    }
  }

  reset() {
    this.steps = [QUESTION_TREE];
    this.matrix = [];
    this.options = [];
    this.licenseList = [...LicenseDefinitions];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private filterByCategory(include: string[], exclude: string[]) {
    if (include) {
      this.licenseList = this.licenseList.filter(license => {
        for (const category of include) {
          if (
            license.categories.find(item => item === category) === undefined
          ) {
            return false;
          }
        }
        return true;
      });
    }
    if (exclude) {
      this.licenseList = this.licenseList.filter(
        license =>
          license.categories.find(
            category => exclude.find(item => item === category) !== undefined,
          ) === undefined,
      );
    }
  }

  private softwareLicenseCompatibility() {
    const newLicenseList: LicenseDetails[] = [...LicenseDefinitions];
    for (const code of this.matrix) {
      const license = LicenseDefinitions.find(item => item.code === code);
      for (let i = newLicenseList.length - 1; i >= 0; i--) {
        const item = newLicenseList[i];
        if (!item.code || !license.compatibility?.includes(item.code)) {
          newLicenseList.splice(i, 1);
        }
      }
    }
    this.licenseList = newLicenseList;
  }

  private dataLicenseCompatibility(): string {
    if (this.options.includes(this.dataLicenses[6])) {
      this.licenseList = [];
      return 'cantLicense';
    } else if (this.options.includes(this.dataLicenses[5])) {
      this.licenseList = [ccBySa];
      return 'end';
    } else if (this.options.includes(this.dataLicenses[4])) {
      this.licenseList = [odbl, ccBySa];
      return 'end';
    } else if (this.options.includes(this.dataLicenses[3])) {
      this.licenseList = [ccByNcSa];
      return 'end';
    } /*else if (this.options.includes([ccByNc])) {
      this.filterByCategory(['nc'], null);
    } else if (this.options.includes([ccBy, odcBy])) {
      this.filterByCategory(null, ['public-domain']);
    } else if (this.options.includes([ccPublicDomain, ccZero, pddl])) {
    }*/
    return '';
  }
}
