import { Component } from '@angular/core';
import { User } from '../model/user';
import { AuthentificationService } from '../shared/authentification.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  title = 'Register';
  constructor(
    private authservice: AuthentificationService,
    private userservice: UserService
  ) {
    //this.user = new User(); // Créer une instance vide de User
  }
  
 // user: User;
  dateToday = new Date();
  dateValue = new Date();
  dateChanged(event: Event) {
    var val = (event.target as HTMLInputElement).value;
   // this.user.birthDate = new Date(val);
  }

 
  

  onCreate() {}
}
