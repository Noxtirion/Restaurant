import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedService } from '../shared.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  isLogged = new BehaviorSubject<boolean>(false);

  constructor(
    private fireAuth: AngularFireAuth,
    private sharedService: SharedService
  ) {}

  async signIn(email: string, password: string) {
    try {
      await this.fireAuth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          this.isLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(res.user));
          //   console.log(this.isLoggedIn);
        });
    } catch (error) {
      console.error(error.message);
    }
  }

  async signUp(email: string, password: string) {
    try {
      await this.fireAuth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const { uid } = res.user;
          this.sharedService.createUserProfileDocument(uid);
          this.isLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(res.user));
        });
    } catch (error) {
      console.error(error.message);
    }
  }

  logout() {
    this.fireAuth.signOut();
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    //  console.log(this.isLoggedIn);
  }

  loggedIn(): boolean {
    return localStorage.getItem('user') != null ? true : false;
  }

  changeLogging(bool: boolean) {
    this.isLogged.next(bool);
    //  this.isLogged.subscribe(x => console.log(x));
    console.log(this.isLogged);
  }
}
