import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';
import { BookingPopupComponent } from '../booking-popup/booking-popup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(BookingPopupComponent);
  }

  ngOnInit(): void {}
}
