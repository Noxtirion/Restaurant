import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuService } from '../menu.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private fireAuth: AngularFireAuth, private menuService: MenuService) {}

  async signIn(email: string, password: string) {
    try {
      await this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
        console.log(this.isLoggedIn);
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  async signUp(email: string, password: string) {
    try {
      await this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
        const { uid } = res.user;
        this.menuService.createUserProfileDocument(uid);
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
    console.log(this.isLoggedIn);
  }
}
