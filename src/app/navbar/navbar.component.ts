import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingPopupComponent } from '../booking-popup/booking-popup.component';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logButtonText: string = 'LOG OUT';

  constructor(
    public dialog: MatDialog,
    private viewportScroller: ViewportScroller,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(BookingPopupComponent);
  }

  onClickScroll(elementId: string): void {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(elementId);
    }, 100);
  }

  logout() {
    this.authService.logout();
  }
}
