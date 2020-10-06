import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingPopupComponent } from '../booking-popup/booking-popup.component';
import { MenuService } from '../services/menu.service';
import { ContactRequest } from '../models/booking-popup.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  isUserBook: boolean = false;
  userOrder: ContactRequest;
  subscription: Subscription;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private menuService: MenuService
  ) {}

  async ngOnInit(): Promise<void> {
    this.getOrder();
    this.checkUserBook();
    await this.getUserOrder();
    console.log(this.userOrder);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.changeLogging(false);
    this.authService.logout();
  }

  openDialog() {
    this.dialog.open(BookingPopupComponent);
  }

  checkUserBook() {
    this.isUserBook = this.menuService.getBookStatus();
    console.log(this.isUserBook);
  }

  async getUserOrder() {
    await this.menuService.getUserOrder().then(x => (this.userOrder = x));
  }

  getOrder() {
    this.subscription = this.menuService.newOrder.subscribe(x => (this.userOrder = x));
    //  console.log(this.isLogged);
  }
}
