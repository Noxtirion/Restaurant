import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductOrder, OrderPerUserArray } from '../models/product';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private userRefId: any = null;
  private items: Observable<any[]>;
  orderPerUser: OrderPerUserArray[] = [];
  chosenMenu: ProductOrder[] = [];
  userOrder: any;

  constructor(
    private sharedService: SharedService,
    private firestore: AngularFirestore
  ) {
    this.items = this.firestore.collection('menus').valueChanges();
  }

  async createMenuOrder() {
    try {
      await this.sharedService.getUserId().then((x) => {
        this.userRefId = x;
      });
    } catch (error) {
      console.error(error);
    }

    const orderPerUserToObject = this.orderPerUser.reduce(
      (acc, key) => ({ ...acc, [`guest${key.id}`]: key }),
      {}
    );

    this.userRefId &&
      this.firestore
        .collection('guestOrder')
        .doc(`${this.userRefId}`)
        .set(orderPerUserToObject);
  }

  getOrderPerUser(order: number) {
    if (order === 10) return (this.orderPerUser = []);

    this.orderPerUser = this.orderPerUser.filter(
      (x) => x.id !== (order + 1).toString()
    );
    this.orderPerUser.push({
      id: (order + 1).toString(),
      menu: this.chosenMenu,
    });

    return this.orderPerUser.sort(this.sortOrder);
  }

  removeOrder(element: { dataset: { userId: any } }) {
    let userId = element.dataset.userId;
    this.orderPerUser = this.orderPerUser.filter((x) => x.id !== userId);

    return this.orderPerUser;
  }

  async removeAllOrder() {
    try {
      await this.sharedService.getUserId().then((x) => {
        this.userRefId = x;
      });
    } catch (error) {
      console.error(error);
    }
    this.userRefId &&
      this.firestore.collection('guestOrder').doc(`${this.userRefId}`).set({});
  }

  async getMenuOrder() {
    await this.sharedService.getUserId().then((x) => {
      this.userRefId = x;
    });
    if (!this.userRefId) return;
    return this.firestore
      .collection('guestOrder')
      .doc(`${this.userRefId}`)
      .get()
      .toPromise()
      .then((x) => {
        if (!x.data()) return;
        this.orderPerUser = Object.values(x.data());
        return Object.values(x.data()).sort(this.sortOrder);
      });
  }

  getMenuItem(item: any, dish: { innerText: any }) {
    this.checkMenuItem(dish);
    let id: string;
    if (dish.innerText === 'BREAKFAST') id = '1';
    if (dish.innerText === 'MAIN COURSE') id = '2';
    if (dish.innerText === 'DESSERTS') id = '3';
    if (dish.innerText === 'DRINKS') id = '4';
    this.chosenMenu.push({
      dishType: dish.innerText,
      order: { name: item.name, price: item.price },
      id: id,
    });
    this.chosenMenu.sort(this.sortOrder);
    return this.chosenMenu;
  }

  resetChosenMenu() {
    this.chosenMenu = [];
  }

  checkMenuItem(dish: { innerText: any }) {
    this.chosenMenu = this.chosenMenu.filter(
      (element) => element.dishType !== dish.innerText
    );
  }

  async bookMenu(): Promise<any> {
    return this.items
      .pipe(first())
      .toPromise()
      .then((x) => x.sort(this.sortOrder));
  }

  private sortOrder(a: { id: string }, b: { id: string }) {
    return parseInt(a.id) - parseInt(b.id);
  }

  async getUserOrder() {
    await this.sharedService.getUserId().then((x) => {
      this.userRefId = x;
    });

    await this.firestore
      .collection('bookingOrders')
      .doc(`${this.userRefId}`)
      .get()
      .toPromise()
      .then((x) => {
        !x.data() ? (this.userOrder = null) : (this.userOrder = x.data());
      });
    return this.userOrder;
  }
}
