import { UserRole } from './UserRole';

export class Profil {
  constructor(
    public id: string,
    public Name: string,
    public Email: string,
    public Password: string,
    public Role: UserRole,
    public Gender: 'female' | 'male',
    public Tel: string,
    public Country: string
  ) {}
}
