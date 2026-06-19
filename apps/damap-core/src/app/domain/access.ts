import { FunctionRole } from './enum/function-role.enum';

export interface Access {
  id: number;
  dmpId: number;
  role: FunctionRole;
  start?: Date;
  until?: Date;
  readonly identifier: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly mbox: string;
}

export interface UserDo {
  identifier: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
}
