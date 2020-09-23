import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { from } from 'rxjs';
import { BookingPopupComponent } from '../booking-popup/booking-popup.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public dialog: MatDialog, private viewportScroller: ViewportScroller) {}

  openDialog() {
    this.dialog.open(BookingPopupComponent);
  }

  onClickScroll(elementId: string): void {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(elementId);
    }, 100);
  }

  ngOnInit(): void {}
}
