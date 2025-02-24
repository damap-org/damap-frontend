import { Access } from '../domain/access';
import { FunctionRole } from '../domain/enum/function-role.enum';
import { IdentifierType } from '../domain/enum/identifier-type.enum';

export const mockAccess: Access = {
  id: 100,
  dmpId: 100,
  universityId: '12345',
  personId: null,
  firstName: 'Max',
  lastName: 'Mustermann',
  mbox: 'm.mustermann@university.ac.at',
  affiliation: 'TU Wien',
  affiliationId: { identifier: 'XXX', type: IdentifierType.ROR },
  contact: true,
  roles: [],
  roleInProject: undefined,
  access: FunctionRole.EDITOR,
};
