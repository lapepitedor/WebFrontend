import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login_failed: boolean = false;
  @ViewChild('email')
  emailElement!: ElementRef;
  @ViewChild('password') passwordElement!: ElementRef;

  constructor(
    private authservice: AuthentificationService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  async onSubmit() {
    let email = this.emailElement.nativeElement.value;
    let password = this.passwordElement.nativeElement.value;

    let result = await this.authservice.login(email, password);

    if (result) {
      this.route.navigate(['/dashboard']);
      this.snackBar.open('Erfolgreich eingeloggt !', 'Close', {
        duration: 1500, 
        verticalPosition: 'top', 
        horizontalPosition: 'end', 
      });
    } else {
      this.login_failed = true;
    }
  }

  onCancel() {
    this.emailElement.nativeElement.value = '';
    this.passwordElement.nativeElement.value = '';
  }
}
