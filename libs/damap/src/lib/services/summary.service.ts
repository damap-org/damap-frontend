import { Injectable } from '@angular/core';
import { Dmp } from '../domain/dmp';
import { Project } from '../domain/project';
import { Contributor } from '../domain/contributor';
import { DataKind } from '../domain/enum/data-kind.enum';
import { Dataset } from '../domain/dataset';
import { DataSource } from '../domain/enum/data-source.enum';
import { Host } from '../domain/host';
import { SecurityMeasure } from '../domain/enum/security-measure.enum';
import { ComplianceType } from '../domain/enum/compliance-type.enum';
import { Agreement } from '../domain/enum/agreement.enum';
import { DataAccessType } from '../domain/enum/data-access-type.enum';
import { DataQualityType } from '../domain/enum/data-quality-type.enum';

export interface Completeness {
  step: string;
  completeness: number; // 0 - 100
  status: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  static dmpSummary(dmp: Dmp): Completeness[] {
    const projectStep = this.evaluateProjectStep(dmp.project);
    const peopleStep = this.evaluatePeopleStep(dmp.contributors);
    const dataStep = this.evaluateDataStep(dmp);

    if (
      (dmp.dataKind !== DataKind.SPECIFY &&
        dmp.reusedDataKind !== DataKind.SPECIFY) ||
      !dmp.datasets.length
    ) {
      // Always display the data step, even if the data is not specified - necessary for the summary navigation
      let summary = [projectStep, peopleStep, dataStep];
      return summary.concat(this.noDatasetsSummary());
    }

    const docStep = this.evaluateDocumentationStep(dmp);
    const storageStep = this.evaluateStorageStep(dmp);
    const legalStep = this.evaluateLegalStep(dmp);
    const licenseStep = this.evaluateLicenseStep(dmp);
    const repositoryStep = this.evaluateRepositoryStep(dmp);
    const reuseStep = this.evaluateReuseStep(dmp);
    const costStep = this.evaluateCostStep(dmp);
    return [
      projectStep,
      peopleStep,
      dataStep,
      docStep,
      storageStep,
      legalStep,
      licenseStep,
      repositoryStep,
      reuseStep,
      costStep,
    ];
  }

  static evaluateProjectStep(project: Project): Completeness {
    const projectsLevel: Completeness = {
      step: 'dmp.steps.project.label',
      completeness: 0,
      status: [],
    };

    if (!project) {
      projectsLevel.completeness = 0;
      projectsLevel.status.push('dmp.steps.summary.project.none');
    } else {
      projectsLevel.completeness = 100;
      projectsLevel.status.push(`Project: ${project.title}.`);
    }

    return projectsLevel;
  }

  static evaluatePeopleStep(contributors: Contributor[]): Completeness {
    const peopleLevel: Completeness = {
      step: 'dmp.steps.people.label',
      completeness: 0,
      status: [],
    };
    const contact = contributors.find(c => c.contact);

    if (contact) {
      peopleLevel.completeness += 50;
      peopleLevel.status.push('dmp.steps.summary.people.contact.set');
    } else {
      peopleLevel.status.push('dmp.steps.summary.people.contact.missing');
    }

    if (contributors?.length === 0) {
      peopleLevel.completeness = 0;
      peopleLevel.status.push('dmp.steps.summary.people.contributor.none');
    } else {
      peopleLevel.completeness += 50;
      if (contributors.length === 1) {
        peopleLevel.status.push('dmp.steps.summary.people.contributor.one');
      } else {
        peopleLevel.status.push(
          'dmp.steps.summary.people.contributor.multiple',
        );
        peopleLevel.status.push(`${contributors.length}`);
      }
    }

    return peopleLevel;
  }

  static evaluateDataStep(dmp: Dmp): Completeness {
    const datasetLevel: Completeness = {
      step: 'dmp.steps.data.specify.label',
      completeness: 0,
      status: [],
    };

    const kinds = ['dataKind', 'reusedDataKind'];

    for (const kind of kinds) {
      const datakind = kind === 'dataKind' ? 'produced' : 'reused';
      if (dmp[kind] === DataKind.NONE) {
        datasetLevel.completeness += 50;
        datasetLevel.status.push(
          `dmp.steps.summary.data.specify.datasets.none.${datakind}`,
        );
      } else if (dmp[kind] === DataKind.SPECIFY) {
        // check if datasets exist
        const dataSource =
          kind === 'dataKind' ? DataSource.NEW : DataSource.REUSED;
        const datasets = this.getDatasetsBySource(dmp.datasets, dataSource);
        if (datasets.length > 0) {
          datasetLevel.completeness += 50;
        }
        datasetLevel.status.push(
          `dmp.steps.summary.data.specify.datasets.${datakind}`,
        );
        datasetLevel.status.push(`${datasets.length}. `);
      } else if (dmp[kind] === DataKind.UNKNOWN) {
        datasetLevel.status.push(
          `dmp.steps.summary.data.specify.datasets.unknown.${datakind}`,
        );
      }
    }

    // check if missing explanation is set
    if (
      dmp.dataKind === DataKind.NONE &&
      dmp.reusedDataKind === DataKind.NONE
    ) {
      if (!dmp.noDataExplanation) {
        datasetLevel.completeness -= 50;
        datasetLevel.status.push(
          'dmp.steps.summary.data.specify.datasets.missingexplanation',
        );
      }
    } else if (
      dmp.dataKind === DataKind.SPECIFY ||
      dmp.reusedDataKind === DataKind.SPECIFY
    ) {
      if (!dmp.dataGeneration) {
        datasetLevel.completeness =
          datasetLevel.completeness >= 20
            ? datasetLevel.completeness - 20
            : datasetLevel.completeness;
        datasetLevel.status.push(
          'dmp.steps.summary.data.specify.datasets.datageneration',
        );
      }
    } else if (!dmp.dataKind && !dmp.reusedDataKind) {
      datasetLevel.status.push('dmp.steps.summary.data.specify.none.none');
    }

    return datasetLevel;
  }

  static evaluateDocumentationStep(dmp: Dmp): Completeness {
    const docDataQualityLevel: Completeness = {
      step: 'dmp.steps.documentation.label',
      completeness: 0,
      status: [],
    };
    const docPercent = 100 / 4;
    if (dmp.metadata) {
      docDataQualityLevel.completeness += docPercent;
    }
    if (dmp.structure) {
      docDataQualityLevel.completeness += docPercent;
    }
    if (dmp.documentation) {
      docDataQualityLevel.completeness += docPercent;
    }
    if (dmp.dataQuality.length > 0) {
      docDataQualityLevel.completeness += docPercent;
    }
    if (
      dmp.dataQuality.includes(DataQualityType.OTHERS) &&
      !dmp.otherDataQuality
    ) {
      docDataQualityLevel.completeness -= 15;
    }
    if (docDataQualityLevel.completeness === 0) {
      docDataQualityLevel.status.push('dmp.steps.summary.noinfo');
    } else if (docDataQualityLevel.completeness === 100) {
      docDataQualityLevel.status.push('dmp.steps.summary.allinfo');
    } else {
      docDataQualityLevel.status.push('dmp.steps.summary.partially');
    }

    return docDataQualityLevel;
  }

  static evaluateStorageStep(dmp: Dmp): Completeness {
    const storageLevel: Completeness = {
      step: 'dmp.steps.storage.label',
      completeness: 0,
      status: [],
    };
    const datasets = this.getDatasetsBySource(dmp.datasets, DataSource.NEW);
    if (datasets.length == 0) {
      storageLevel.completeness = 100;
      storageLevel.status.push('dmp.steps.summary.storage.nonestored');
      return storageLevel;
    }

    const storage = dmp.storage;
    const eStorage = dmp.externalStorage;
    const storageDatasets: string[] = [
      ...new Set([
        ...SummaryService.getAllHostDatasets(storage),
        ...SummaryService.getAllHostDatasets(eStorage),
      ]),
    ];

    if (!storage.length && !eStorage.length && !storageDatasets.length) {
      storageLevel.completeness = 0;
      storageLevel.status.push('dmp.steps.summary.noinfo');
    } else if (storageDatasets.length < datasets.length) {
      storageLevel.completeness =
        100 * (storageDatasets.length / datasets.length);
      storageLevel.status.push('dmp.steps.summary.someinfo');
    } else {
      storageLevel.completeness = 100;
      storageLevel.status.push('dmp.steps.summary.storage.alldata');
    }
    if (eStorage.length && !dmp.externalStorageInfo) {
      storageLevel.completeness =
        storageLevel.completeness > 0 ? storageLevel.completeness * 0.5 : 0;
      storageLevel.status.push('dmp.steps.summary.storage.missingexplanation');
    }

    return storageLevel;
  }

  static evaluateLegalStep(dmp: Dmp): Completeness {
    const legalEthicalAspectsLevel: Completeness = {
      step: 'dmp.steps.legal.label',
      completeness: 0,
      status: [],
    };
    const legalPercent = 25;
    // Sensitive Data
    if (dmp.sensitiveData) {
      legalEthicalAspectsLevel.completeness +=
        (this.conditionalInfo(
          dmp,
          'sensitiveData',
          dmp.sensitiveDataSecurity,
          SecurityMeasure.OTHER,
          dmp.otherDataSecurityMeasures,
        ) *
          legalPercent) /
        3;
      if (dmp.sensitiveDataAccess) {
        legalEthicalAspectsLevel.completeness += legalPercent / 3;
      }
    } else {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }

    // Personal Data
    if (dmp.personalData) {
      legalEthicalAspectsLevel.completeness +=
        (this.conditionalInfo(
          dmp,
          'personalData',
          dmp.personalDataCompliance,
          ComplianceType.OTHER,
          dmp.otherPersonalDataCompliance,
        ) *
          legalPercent) /
        2;
    } else {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }

    // Legal Restrictions
    if (dmp.legalRestrictions) {
      legalEthicalAspectsLevel.completeness +=
        (this.conditionalInfo(
          dmp,
          'legalRestrictions',
          dmp.legalRestrictionsDocuments,
          Agreement.OTHER,
          dmp.otherLegalRestrictionsDocument,
        ) *
          legalPercent) /
        3;
      if (dmp.legalRestrictionsComment) {
        legalEthicalAspectsLevel.completeness += legalPercent / 3;
      }
    } else {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }

    if (dmp.dataRightsAndAccessControl) {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }

    if (legalEthicalAspectsLevel.completeness === 0) {
      legalEthicalAspectsLevel.status.push('dmp.steps.summary.noinfo');
    } else if (legalEthicalAspectsLevel.completeness >= 100) {
      legalEthicalAspectsLevel.status.push('dmp.steps.summary.allinfo');
    } else {
      legalEthicalAspectsLevel.status.push('dmp.steps.summary.partially');
    }
    return legalEthicalAspectsLevel;
  }

  static evaluateLicenseStep(dmp: Dmp): Completeness {
    const licensesLevel: Completeness = {
      step: 'dmp.steps.licensing.label',
      completeness: 100,
      status: [],
    };

    const newDatasets = this.getDatasetsBySource(dmp.datasets, DataSource.NEW);
    const publishedDatasets = newDatasets.filter(
      d => d.dataAccess === DataAccessType.OPEN,
    );
    const restrictedCount = newDatasets.filter(
      d => d.dataAccess === DataAccessType.RESTRICTED,
    ).length;
    const closedCount = newDatasets.filter(
      d => d.dataAccess === DataAccessType.CLOSED,
    ).length;
    const deletedDatasets = newDatasets.filter(d => d.delete);

    const incompleteDataset = publishedDatasets.find(
      d => !d.license || !d.startDate,
    );
    if (incompleteDataset) {
      licensesLevel.completeness -= 30;
    }

    if (
      (restrictedCount && !dmp.restrictedAccessInfo) ||
      (closedCount && !dmp.closedAccessInfo)
    ) {
      licensesLevel.completeness -= 30;
    }

    const incompleteDeletedDataset = deletedDatasets.find(
      d => !d.deletionPerson || !d.dateOfDeletion || !d.reasonForDeletion,
    );
    if (deletedDatasets.length > 0 && incompleteDeletedDataset) {
      licensesLevel.completeness -= 30;
    }

    if (licensesLevel.completeness < 100) {
      licensesLevel.status.push('dmp.steps.summary.licensing.incomplete');
    } else {
      licensesLevel.status.push('dmp.steps.summary.licensing.complete');
    }
    return licensesLevel;
  }

  static evaluateRepositoryStep(dmp: Dmp): Completeness {
    const repositoriesLevel: Completeness = {
      step: 'dmp.steps.repositories.label',
      completeness: 0,
      status: [],
    };

    const repoDatasets: string[] = [
      ...new Set([...this.getAllHostDatasets(dmp.repositories)]),
    ];
    const newDatasets = dmp.datasets.filter(
      d => d.source === DataSource.NEW && d.dataAccess === DataAccessType.OPEN,
    );
    const undepositedDataset = newDatasets.find(
      d => !repoDatasets.includes(d.referenceHash),
    );

    if (newDatasets.length && undepositedDataset) {
      repositoriesLevel.completeness = 0;
      repositoriesLevel.status.push(
        'dmp.steps.summary.repositories.deposited.incomplete',
      );
    } else {
      repositoriesLevel.completeness = 100;
      repositoriesLevel.status.push(
        'dmp.steps.summary.repositories.deposited.complete',
      );
    }

    return repositoriesLevel;
  }

  static evaluateReuseStep(dmp: Dmp): Completeness {
    const reuseLevel: Completeness = {
      step: 'dmp.steps.data.reuse.label',
      completeness: 0,
      status: [],
    };
    const restrictedDatasets = !!dmp.datasets.filter(
      d =>
        d.dataAccess === DataAccessType.RESTRICTED &&
        d.source === DataSource.NEW,
    ).length;
    const reusePercent = 100 / (restrictedDatasets ? 3 : 2);
    if (dmp.targetAudience) {
      reuseLevel.completeness += reusePercent;
    }
    if (dmp.tools) {
      reuseLevel.completeness += reusePercent;
    }
    if (restrictedDatasets && dmp.restrictedDataAccess) {
      reuseLevel.completeness += reusePercent;
    }
    if (!reuseLevel.completeness) {
      reuseLevel.status.push('dmp.steps.summary.noinfo');
    } else if (reuseLevel.completeness >= 100) {
      reuseLevel.status.push('dmp.steps.summary.allinfo');
    } else {
      reuseLevel.status.push('dmp.steps.summary.partially');
    }
    return reuseLevel;
  }

  static evaluateCostStep(dmp: Dmp): Completeness {
    const costsLevel: Completeness = {
      step: 'dmp.steps.costs.label',
      completeness: 0,
      status: [],
    };
    if (dmp.costsExist == null) {
      costsLevel.completeness = 0;
      costsLevel.status.push('dmp.steps.summary.notspecified');
    } else if (!dmp.costsExist) {
      costsLevel.completeness = 100;
      costsLevel.status.push('dmp.steps.summary.costs.none');
    } else {
      costsLevel.completeness = dmp.costs.length ? 100 : 0;
      costsLevel.status.push(`${dmp.costs.length} cost items specified.`);
    }
    return costsLevel;
  }

  private static noDatasetsSummary(): Completeness[] {
    let summary = [
      { step: 'dmp.steps.documentation.label', completeness: 0, status: [] },
      { step: 'dmp.steps.storage.label', completeness: 0, status: [] },
      { step: 'dmp.steps.legal.label', completeness: 0, status: [] },
      { step: 'dmp.steps.licensing.label', completeness: 0, status: [] },
      { step: 'dmp.steps.repositories.label', completeness: 0, status: [] },
      { step: 'dmp.steps.data.reuse.label', completeness: 0, status: [] },
      { step: 'dmp.steps.costs.label', completeness: 0, status: [] },
    ];
    for (const step of summary) {
      step.status = ['dmp.steps.summary.nodatasets'];
    }
    return summary;
  }

  private static getDatasetsBySource(
    datasets: Dataset[],
    source: DataSource,
  ): Dataset[] {
    return datasets.filter(d => d.source === source);
  }

  /**
   * Returns a list of all datasets of all hosts.
   * May contain duplicates.
   *
   * @param hosts list of hosts to get datasets from
   * @private
   */
  private static getAllHostDatasets(hosts: Host[]): string[] {
    if (!hosts) return [];
    let datasets: string[] = [];
    for (const entry of hosts) {
      datasets = datasets.concat(entry.datasets);
    }
    return datasets;
  }

  private static conditionalInfo(
    dmp: Dmp,
    condition: string,
    enumList: string[],
    otherEnum: string,
    otherField: string,
  ): number {
    let completeness = 0;
    for (const item of dmp.datasets) {
      if (item[condition]) {
        completeness += 1;
        break;
      }
    }
    if (enumList.length) {
      if (
        !enumList.includes(otherEnum) ||
        (enumList.includes(otherEnum) && otherField)
      ) {
        completeness += 1;
      }
    }
    return completeness;
  }
}
