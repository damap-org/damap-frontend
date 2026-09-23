import { FundingState } from '../domain/enum/funding-state.enum';
import { IdentifierType } from '../domain/enum/identifier-type.enum';
import { Project } from '../domain/project';

export const mockProject: Project = {
  end: new Date(),
  funding: {
    fundingName: 'Funding name',
    fundingProgram: 'Funding program',
    funderId: {
      identifier: '501100004955',
      type: IdentifierType.FUNDREF,
    },
    fundingStatus: FundingState.GRANTED,
    grantId: {
      identifier: '123456',
      type: null,
    },
    id: 79,
  },
  id: 78,
  start: new Date(),
  title: 'Project title',
  universityId: 1234,
  description: '',
  dmpExists: true,
  funderSupported: true,
  acronym: 'Acronym',
};

export const mockRecommendedProject: Project = {
  end: new Date(),
  funding: {
    fundingName: 'Funding name',
    fundingProgram: 'Funding program',
    funderId: {
      identifier: '501100004955',
      type: IdentifierType.FUNDREF,
    },
    fundingStatus: FundingState.GRANTED,
    grantId: {
      identifier: '1337',
      type: null,
    },
    id: 1337,
  },
  id: 1337,
  start: new Date(),
  title: 'Recommended Project title',
  universityId: 1337,
  description: '',
  dmpExists: true,
  funderSupported: false,
  acronym: 'Acronym',
};

export const mockManualProject: Project = {
  end: new Date(),
  funding: undefined,
  id: 78,
  start: new Date(),
  title: 'Project title 2',
  universityId: undefined,
  description: '',
  dmpExists: undefined,
  funderSupported: false,
  acronym: 'Acronym',
};
