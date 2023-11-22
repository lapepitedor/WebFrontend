import { UserRole } from "./UserRole";

export class User {
  id: string;
  name: string;
  email: string;
   password: string;
  role: UserRole;
  birthDate: Date;
  gender: 'female' | 'male';
  address: string;

  constructor(
    id: string,
    name: string,
    email: string,
     password: string,
    role: UserRole ,
    birthDate: Date,
    gender: 'female' | 'male',
    address: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
      this.password = password;
    this.role = role;
    this.birthDate = birthDate;
    this.gender = gender;
    this.address = address;
  }
}
