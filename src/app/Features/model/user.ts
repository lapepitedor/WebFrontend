import { UserRole } from "./UserRole";

export class User {
  id: string;
  name: string;
  email: string;
   password: string;
  role: UserRole;
  tel: string;
  gender: 'female' | 'male';
  country: string;

  constructor(
    id: string,
    name: string,
    email: string,
     password: string,
    role: UserRole ,
    tel: string,
    gender: 'female' | 'male',
   country: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
      this.password = password;
    this.role = role;
    this.tel = tel;
    this.gender = gender;
    this.country = country;
  }
}
