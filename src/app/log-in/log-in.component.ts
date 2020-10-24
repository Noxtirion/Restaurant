import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  isSignedIn: boolean = false;
  signUpErrorMessage: string;
  signInErrorMessage: string;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onSignUp(email: string, password: string) {
    await this.authService
      .signUp(email, password)
      .then(() => (this.signUpErrorMessage = 'Invalid email or password'));

    if (this.authService.isLoggedIn) {
      this.isSignedIn = true;
      this.goToUserProfile();
      this.changeLogging();
    }
  }

  async onSignIn(email: string, password: string) {
    await this.authService
      .signIn(email, password)
      .then(() => (this.signInErrorMessage = 'Invalid email or password'));

    if (this.authService.isLoggedIn) {
      this.isSignedIn = true;
      this.goToUserProfile();
      this.changeLogging();
    }
  }

  changeLogging() {
    this.authService.changeLogging(true);
  }

  goToUserProfile() {
    if (this.isSignedIn) {
      this.router.navigate(['/user-profile']);
    } else {
      return false;
    }
  }
}
