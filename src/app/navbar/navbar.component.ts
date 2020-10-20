import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from '../log-in/log-in.component';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../services/auth-service/auth.service';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  //   isBooked: boolean = false;
  isLogged: boolean = false;
  subscription: Subscription;
  isOpen: boolean = false;

  constructor(
    public dialog: MatDialog,
    private viewportScroller: ViewportScroller,
    public authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getLog();
    this.isLoggedIn();
    console.log(this.isLogged);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog() {
    this.dialog.open(LogInComponent);
  }

  onClickScroll(elementId: string): void {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(elementId);
    }, 0);
  }

  //   async checkBooking() {
  //     //  await this.menuService.checkIfUserBooked();
  //     this.isBooked = this.menuService.getBookStatus();
  //     //  console.log(this.isBooked);
  //   }
  //   async checkBooking() {
  //     localStorage.getItem('user') != null ? (this.isBooked = true) : (this.isBooked = false);
  //     //  await this.menuService.checkUserIsLogged().then(res => {
  //     //    if (res) this.isBooked = true;
  //     //  });
  //     console.log(this.isBooked);
  //   }

  isLoggedIn() {
    if (this.authService.loggedIn()) {
      this.isLogged = true;
    }
  }

  getLog() {
    this.subscription = this.authService.isLogged.subscribe(
      (x) => (this.isLogged = x)
    );
    //  console.log(this.isLogged);
  }

  openMenu() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }
}
