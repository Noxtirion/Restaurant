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
  isUserBook: boolean = false;
  userOrder: ContactRequest;
  subscription: Subscription;
  guestSubscription: Subscription;
  menuPerPerson: Products[] = [];
  numberOfGuests: any;
  isLoaded: boolean = false;
  chosenMenu: ProductOrder[];
  orderPerUser: OrderPerUserArray[] = [];

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private userProfileService: UserProfileService
  ) {}

  async ngOnInit(): Promise<void> {
    this.getOrder();
    this.getNumberOfguests();
    this.bookMenu();
    this.checkUserBook();
    await this.getUserOrder();
    console.log(this.menuPerPerson);
    await this.getMenuOrder();
    this.isLoaded = true;
    console.log(this.chosenMenu);
    //  this.orderPerUser = JSON.parse(localStorage.getItem('order'));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.guestSubscription.unsubscribe();
  }

  getOrderPerUser(order: number) {
    this.orderPerUser = this.userProfileService.getOrderPerUser(order);
    // localStorage.setItem('order', JSON.stringify(this.orderPerUser));
    this.chosenMenu = null;
    this.userProfileService.resetChosenMenu();

    console.log(this.orderPerUser);
    // console.log(order);
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
    // add unsubscribe!!!!!
    console.log(this.numberOfGuests);
    this.guestSubscription = this.sharedService.newBookMenu.subscribe(
      (x) => (this.numberOfGuests = x)
    );
  }

  getMenuItem(item: any, dish: { innerText: any }) {
    this.chosenMenu = this.userProfileService.getMenuItem(item, dish);
    console.log(this.chosenMenu);
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
    //  localStorage.removeItem('order');
    this.dialog.open(BookingPopupComponent);
  }

  checkUserBook() {
    this.isUserBook = this.sharedService.getBookStatus();
    console.log(this.isUserBook);
  }

  async getUserOrder() {
    await this.userProfileService.getUserOrder().then((x) => {
      this.userOrder = x;
      // this.numberOfGuests.push();

      if (this.userOrder)
        this.sharedService.changeMenu(this.userOrder.numberOfGuests);
    });
  }

  createMenuOrder() {
    this.userProfileService.createMenuOrder();
  }

  getOrder() {
    this.subscription = this.sharedService.newOrder.subscribe(
      (x) => (this.userOrder = x)
    );
  }
}
