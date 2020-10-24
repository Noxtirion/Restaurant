import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingPopupComponent } from '../booking-popup/booking-popup.component';
import { SharedService } from '../services/shared.service';
import { UserProfileService } from './user-profile.service';
import { ContactRequest } from '../models/booking-popup.model';
import { Subscription } from 'rxjs';
import { Products, ProductOrder, OrderPerUserArray } from '../models/product';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userOrder: ContactRequest;
  subscription: Subscription;
  guestSubscription: Subscription;
  menuPerPerson: Products[] = [];
  numberOfGuests: any;
  isLoaded: boolean = false;
  chosenMenu: ProductOrder[];
  orderPerUser: OrderPerUserArray[] = [];
  bookingButtonText: string = 'BOOK TABLE';
  submitButton = {
    text: 'SUBMIT ORDER',
    colorSucceed: false,
  };

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private userProfileService: UserProfileService
  ) {}

  async ngOnInit(): Promise<void> {
    this.dialog.closeAll();
    this.getOrder();
    this.getNumberOfguests();
    this.bookMenu();
    await this.getUserOrder();
    await this.getMenuOrder();
    this.isLoaded = true;
    this.changeButtonText();
  }

  changeButtonText() {
    this.orderPerUser === undefined || this.orderPerUser.length === 0
      ? (this.bookingButtonText = 'BOOK TABLE')
      : (this.bookingButtonText = 'RESET ORDER / BOOK TABLE');
  }

  changeSubmitButtonText() {
    this.submitButton = {
      text: 'SUBMIT SUCCEED',
      colorSucceed: true,
    };

    setTimeout(() => {
      this.submitButton = {
        text: 'SUBMIT ORDER',
        colorSucceed: false,
      };
    }, 3000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.guestSubscription.unsubscribe();
  }

  getOrderPerUser(order: number) {
    this.orderPerUser = this.userProfileService.getOrderPerUser(order);
    this.chosenMenu = null;
    this.userProfileService.resetChosenMenu();
    this.changeButtonText();
  }

  removeOrder(element: { dataset: { userId: any } }) {
    this.orderPerUser = this.userProfileService.removeOrder(element);
    this.createMenuOrder();
  }

  async getMenuOrder() {
    await this.userProfileService
      .getMenuOrder()
      .then((x) => (this.orderPerUser = x));
  }

  getNumberOfguests() {
    this.guestSubscription = this.sharedService.newBookMenu.subscribe(
      (x) => (this.numberOfGuests = x)
    );
  }

  getMenuItem(item: any, dish: { innerText: any }) {
    this.chosenMenu = this.userProfileService.getMenuItem(item, dish);
  }

  bookMenu() {
    this.userProfileService.bookMenu().then((x) => {
      this.menuPerPerson = x;
    });
  }

  logout() {
    this.authService.changeLogging(false);
    this.authService.logout();
    this.userProfileService.chosenMenu = [];
  }

  openDialog() {
    this.getOrderPerUser(10);
    this.userProfileService.removeAllOrder();
    this.changeButtonText();
    this.dialog.open(BookingPopupComponent, {
      panelClass: 'custom-dialog-container',
    });
  }

  async getUserOrder() {
    await this.userProfileService.getUserOrder().then((x) => {
      this.userOrder = x;

      if (this.userOrder)
        this.sharedService.changeMenu(this.userOrder.numberOfGuests);
    });
  }

  createMenuOrder() {
    this.userProfileService.createMenuOrder();
    this.changeButtonText();
    this.changeSubmitButtonText();
  }

  getOrder() {
    this.subscription = this.sharedService.newOrder.subscribe(
      (x) => (this.userOrder = x)
    );
  }
}
