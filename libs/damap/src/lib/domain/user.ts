export interface User {
  userId: string;
  displayName: string;
  username: string;
  roles: string[];
  apiKeys: string[];
}

export interface UserPage {
  users: User[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
