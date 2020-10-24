import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from '../log-in/log-in.component';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../services/auth-service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  subscription: Subscription;
  isOpen: boolean = false;

  constructor(
    public dialog: MatDialog,
    private viewportScroller: ViewportScroller,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getLog();
    this.isLoggedIn();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog() {
    this.dialog.open(LogInComponent, { panelClass: 'custom-dialog-container' });
  }

  onClickScroll(elementId: string): void {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(elementId);
    }, 100);
  }

  isLoggedIn() {
    if (this.authService.loggedIn()) {
      this.isLogged = true;
    }
  }

  getLog() {
    this.subscription = this.authService.isLogged.subscribe(
      (x) => (this.isLogged = x)
    );
  }

  openMenu() {
    this.isOpen = !this.isOpen;
  }
}
