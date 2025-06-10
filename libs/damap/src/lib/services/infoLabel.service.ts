import { Injectable } from '@angular/core';
import * as template from '../../assets/i18n/templates/en.json';
import { InfoBoxDetails } from '../domain/infoBox-details';

@Injectable({
  providedIn: 'root',
})
export class InfoLabelService {
  constructor() {}

  templateData = template;
  baseStringLookupObject;

  getInfo(index: number) {
    let info: InfoBoxDetails = {};
    this.baseStringLookupObject = this.templateData.dmp.steps;
    switch (index) {
      case 0:
        this.baseStringLookupObject = this.baseStringLookupObject.project;
        break;
      case 1:
        this.baseStringLookupObject = this.baseStringLookupObject.people;
        break;
      case 2:
        this.baseStringLookupObject = this.baseStringLookupObject.data.specify;
        break;
      case 3:
        this.baseStringLookupObject = this.baseStringLookupObject.documentation;
        break;
      case 4:
        this.baseStringLookupObject = this.baseStringLookupObject.storage;
        break;
      case 5:
        this.baseStringLookupObject = this.baseStringLookupObject.legal;
        break;
      case 6:
        this.baseStringLookupObject = this.baseStringLookupObject.licensing;
        break;
      case 7:
        this.baseStringLookupObject = this.baseStringLookupObject.repositories;
        break;
      case 8:
        this.baseStringLookupObject = this.baseStringLookupObject.data.reuse;
        break;
      case 9:
        this.baseStringLookupObject = this.baseStringLookupObject.costs;
        break;
      case 10:
        this.baseStringLookupObject = this.baseStringLookupObject.end;
        break;
      default:
        this.baseStringLookupObject = this.baseStringLookupObject.project;
        break;
    }
    info.greeting = this.baseStringLookupObject.greeting;
    info.summaryLine = this.baseStringLookupObject.summaryLine;
    info.instructions = this.baseStringLookupObject.instructions;
    info.stepNumber = index < 1 || index > 11 ? 1 : index + 1;
    return info;
  }
}
