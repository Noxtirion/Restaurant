import { Injectable } from '@angular/core';
// import { PRODUCTS } from '../models/database';
import { ProductOrder, Products, OrderPerUserArray } from '../models/product';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, pipe, Subject, BehaviorSubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { ContactRequest, CancelRequest } from '../models/booking-popup.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userRefId: any = null; //shared
  private bookOrders: Observable<any[]>;
  private bookOrdersValue: Observable<any[]>;
  anchor = new BehaviorSubject<boolean>(false);
  newBookMenu = new Subject(); //shared
  newOrder = new Subject<ContactRequest>();
  canceledBook: ContactRequest;
  allBookedItems: any[];
  uniqueId: string;
  isBooked: boolean = false;
  numberOfGuests: any; //shared

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    this.bookOrders = this.firestore
      .collection('bookingOrders')
      .snapshotChanges();
    this.bookOrdersValue = this.firestore
      .collection('bookingOrders')
      .valueChanges();
    //  this.createId();

    //  firestore
    //    .collection('menus')
    //    .add(this.products[3])
    //    .then(function() {
    //      console.log('Document successfully written!');
    //    })
    //    .catch(function(error) {
    //      console.error('Error writing document: ', error);
    //    });
    //  this.getItems();

    //  this.checkIfUserBooked();
  }

  changeOrder(order: ContactRequest) {
    this.newOrder.next(order);

    //  this.isLogged.subscribe(x => console.log(x));
    //  console.log(this.newOrder);
  }

  /////////////////////////////// shared
  changeMenu(guests: number) {
    this.numberOfGuests = [];

    if (guests)
      for (let i = 0; i < guests; i++) {
        this.numberOfGuests.push(i);
        this.newBookMenu.next(this.numberOfGuests);
      }
    //  console.log(this.numberOfGuests);
  }
  ///////////////////////////////////////

  ///////////////////////////////////shared
  async getUserId() {
    try {
      await this.fireAuth.authState
        .pipe(first())
        .toPromise()
        .then((user) =>
          user !== null ? (this.userRefId = user.uid) : (this.userRefId = null)
        );
    } catch (error) {
      console.error(error);
    }
    return this.userRefId;
  }
  ///////////////////////////////////

  //////////////////////////////////in auth service ---to check!

  createUserProfileDocument = (userId: any) => {
    if (!userId) return;

    const userRef = this.firestore.collection('bookingOrders').doc(`${userId}`);
    console.log(userRef);
  };
  ////////////////////////////////////

  ////////////////////////////////shared
  async checkIfUserBooked() {
    await this.getUserId();
    await this.firestore
      .collection('bookingOrders')
      .doc(`${this.userRefId}`)
      .snapshotChanges()
      .pipe(first())
      .toPromise()
      .then((x) => (this.isBooked = x.payload.exists));
    console.log(this.isBooked);
  }

  getBookStatus() {
    return this.isBooked;
  }
  ///////////////////////////////

  // INTERSECTION OBSERVER // shared

  fromIntersectionObserver(
    element: HTMLElement,
    config: IntersectionObserverInit,
    stopWhenVisible = false
  ) {
    return new Observable<boolean>((subscriber) => {
      const intersectionObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            subscriber.next(entry.isIntersecting);
            if (stopWhenVisible && entry.isIntersecting)
              observer.unobserve(entry.target);
          });
        },
        config
      );

      intersectionObserver.observe(element);

      return {
        unsubscribe() {
          intersectionObserver.disconnect();
        },
      };
    });
  }

  changeAnchorStatus(bool: boolean) {
    this.anchor.next(bool);
  }

  getAnchorStatus() {
    return this.anchor;
  }
}
