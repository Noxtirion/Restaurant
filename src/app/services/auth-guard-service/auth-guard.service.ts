import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { SharedService } from '../shared.service';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private sharedService: SharedService,
    private router: Router,
    public authService: AuthService
  ) {}

  //   public loggedIn(): boolean {
  //     return localStorage.getItem('user') != null ? true : false;
  //   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.loggedIn()) {
      // console.log(this.authService.loggedIn());
      // console.log(this.menuService.isValid);
      return true;
    } else {
      this.router.navigate(['/menus']);
      return false;
    }
  }
}
