import { UserRole } from './UserRole';

export class Profil {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: UserRole,
    public gender: 'female' | 'male',
    public tel: string,
    public country: string
  ) {}
}
