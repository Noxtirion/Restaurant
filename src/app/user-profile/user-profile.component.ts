import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingPopupComponent } from '../booking-popup/booking-popup.component';
import { MenuService } from '../services/menu.service';
import { ContactRequest } from '../models/booking-popup.model';
import { Subscription } from 'rxjs';
import { Products, ProductOrder, OrderPerUserArray } from '../models/product';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
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
  orderPerUser:OrderPerUserArray[] = [];

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private menuService: MenuService
  ) {}

  async ngOnInit(): Promise<void> {
    this.getOrder();
    this.getNumberOfguests();
    this.bookMenu();
    this.checkUserBook();
    await this.getUserOrder();
    console.log(this.menuPerPerson);
    this.isLoaded = true;
    console.log(this.chosenMenu );
   //  this.orderPerUser = JSON.parse(localStorage.getItem('order'));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.guestSubscription.unsubscribe();
  }

  getOrderPerUser(order: number) {
this.orderPerUser = this.menuService.getOrderPerUser(order)
// localStorage.setItem('order', JSON.stringify(this.orderPerUser));
this.chosenMenu = null;
this.menuService.resetChosenMenu()

console.log(this.orderPerUser);
// console.log(order);
}

removeOrder(element: { dataset: { userId: any; }; }) {
  this.orderPerUser = this.menuService.removeOrder(element)
}

  getNumberOfguests() {
    // add unsubscribe!!!!!
    console.log(this.numberOfGuests);
    this.guestSubscription = this.menuService.newBookMenu.subscribe(x => (this.numberOfGuests = x));
  }

  getMenuItem(item: any, dish: { innerText: any }) {
    this.chosenMenu = this.menuService.getMenuItem(item, dish);
    console.log(this.chosenMenu);
  }

  bookMenu() {
    this.menuService.bookMenu().then(x => {
      this.menuPerPerson = x;
    });
  }

  logout() {
    this.authService.changeLogging(false);
    this.authService.logout();
    this.menuService.chosenMenu = [];
  }

  openDialog() {
    this.getOrderPerUser(10);
   //  localStorage.removeItem('order');
    this.dialog.open(BookingPopupComponent);
    
  }

  checkUserBook() {
    this.isUserBook = this.menuService.getBookStatus();
    console.log(this.isUserBook);
  }

  async getUserOrder() {
    await this.menuService.getUserOrder().then(x => {
      this.userOrder = x;
      // this.numberOfGuests.push();
      this.menuService.changeMenu(this.userOrder.numberOfGuests);
    });
  }

  getOrder() {
    this.subscription = this.menuService.newOrder.subscribe(x => (this.userOrder = x));
  }
}
