import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ContactRequest } from '../models/booking-popup.model';

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

  ////////////////////// shared (in booking-popup component)
  changeOrder(order: ContactRequest) {
    this.newOrder.next(order);
  }
  ////////////////////

  /////////////////////////////// shared
  changeMenu(guests: number) {
    this.numberOfGuests = [];

    if (guests)
      for (let i = 0; i < guests; i++) {
        this.numberOfGuests.push(i);
        this.newBookMenu.next(this.numberOfGuests);
      }
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
  };
  ////////////////////////////////////

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
