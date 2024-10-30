import { Injectable } from '@angular/core';
import { Dmp } from '../domain/dmp';
import { Identifier } from '../domain/identifier';
import { IdentifierType } from '../domain/enum/identifier-type.enum';
import { ETemplateType } from '../domain/enum/export-template-type.enum';
import { EFunderIds, EFunderIdsHelper } from '../domain/enum/fundersIds.enum';

@Injectable({
  providedIn: 'root',
})
export class TemplateSelectorService {
  constructor() {}

  selectTemplate(dmp: Dmp): ETemplateType {
    if (dmp.project != null && dmp.project.funding != null) {
      let funderIdentifier: Identifier = dmp.project.funding.funderId;
      if (
        funderIdentifier != null &&
        Object.values(IdentifierType).includes(
          funderIdentifier.type as IdentifierType,
        )
      ) {
        if (this.isHorizonEuropeTemplate(funderIdentifier)) {
          return ETemplateType.HORIZON_EUROPE;
        }
        if (this.isFWFTemplate(funderIdentifier)) {
          return ETemplateType.FWF;
        }
      }
    }
    return ETemplateType.SCIENCE_EUROPE;
  }

  private isHorizonEuropeTemplate(identifierDO: Identifier): boolean {
    return EFunderIdsHelper.getEUFunderIds().includes(identifierDO.identifier);
  }

  private isFWFTemplate(identifierDO: Identifier): boolean {
    return EFunderIdsHelper.getFWFFunderIds().includes(identifierDO.identifier);
  }

  public fundersid() {
    return EFunderIdsHelper.getFundersNameId();
  }

  public typeOfId(valueFunder: string): IdentifierType | void {
    if (
      valueFunder === EFunderIds.EU_FUNDREF_ID ||
      valueFunder == EFunderIds.FWF_FUNDREF_ID
    )
      return IdentifierType.FUNDREF;
    if (
      valueFunder === EFunderIds.EU_ROR_ID ||
      valueFunder == EFunderIds.FWF_ROR_ID
    )
      return IdentifierType.ROR;
    if (
      valueFunder === EFunderIds.EU_ISNI_ID ||
      valueFunder == EFunderIds.FWF_ISNI_ID
    )
      return IdentifierType.ISNI;
  }
}
