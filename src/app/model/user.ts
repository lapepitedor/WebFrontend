export class User {
     id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'agent';
  birthDate: Date;
  city: string;
  country: string;


    constructor(
      id: number,
    name: string,
    email: string,
    password: string,
    role: 'user' | 'admin' | 'agent',
    birthDate: Date,
    city: string,
      country: string,
    
    ) {
        this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.birthDate = birthDate;
    this.city = city;
      this.country = country;
     
  }
}
