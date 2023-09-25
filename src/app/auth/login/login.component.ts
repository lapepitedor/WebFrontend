import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/shared/authentification.service';

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
    private route: Router
  ) {}
  ngOnInit(): void {}

  onSubmit() {
    let email = this.emailElement.nativeElement.value;
    let password = this.passwordElement.nativeElement.value;
    if (this.authservice.login(email, password)) {
      this.route.navigate(['/dashboard']);
    } else
    {
      this.login_failed = true;
    }
  }
}
