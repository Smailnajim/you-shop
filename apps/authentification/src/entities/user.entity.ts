export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  createdAt: Date;
  refreshToken?: string[];
}