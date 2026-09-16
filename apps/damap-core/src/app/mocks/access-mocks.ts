import { Access } from '../domain/access';
import { FunctionRole } from '../domain/enum/function-role.enum';

export const mockAccess: Access = {
  id: 100,
  dmpId: 100,
  identifier: '12345',
  firstName: 'Max',
  lastName: 'Mustermann',
  mbox: 'm.mustermann@university.ac.at',
  role: FunctionRole.EDITOR,
};

export const mockAccessToRemove: Access = {
  id: 100,
  dmpId: 100,
  identifier: '12345',
  firstName: 'Max',
  lastName: 'Mustermann',
  mbox: 'm.mustermann@university.ac.at',
  role: FunctionRole.NO_RIGHTS,
};
