import { Injectable } from '@angular/core';
// import { PRODUCTS } from '../models/database';
// import { Products } from '../models/product';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, pipe, Subject } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ContactRequest, CancelRequest } from '../models/booking-popup.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  //   private products: Products[];
  private items: Observable<any[]>;
  private bookOrders: Observable<any[]>;
  private bookOrdersValue: Observable<any[]>;
  canceledBook: ContactRequest;
  allBookedItems: any[];
  uniqueId: string;
  minDate: Date;
  maxDate: Date;
  private userRefId: any = null;
  isBooked: boolean = false;
  userOrder: any;
  newOrder = new Subject<ContactRequest>();

  //   private userBooked: boolean = false;

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) {
    this.items = this.firestore.collection('menus').valueChanges();
    this.bookOrders = this.firestore.collection('bookingOrders').snapshotChanges();
    this.bookOrdersValue = this.firestore.collection('bookingOrders').valueChanges();
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

  async getMenu(id: string): Promise<any> {
    return this.items
      .pipe(first())
      .toPromise()
      .then(x => x.find(item => item.id === id))
      .then(x => x);
  }

  createFormGroup() {
    return new FormGroup({
      date: new FormControl({ value: '', disabled: true }, [Validators.required]),
      timeAvalible: new FormControl(null, [Validators.required]),
      numberOfGuests: new FormControl(null, [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      uniqueId: new FormControl('')
    });
  }

  async getUserId() {
    try {
      await this.fireAuth.authState
        .pipe(first())
        .toPromise()
        .then(user => (user !== null ? (this.userRefId = user.uid) : (this.userRefId = null)));
    } catch (error) {
      console.error(error);
    }
  }

  async checkUserIsLogged() {
    try {
      return await this.fireAuth.authState.pipe(first()).toPromise();
    } catch (error) {
      console.error(error);
    }
  }

  async createBookingOrder(data: ContactRequest) {
    try {
      await this.getUserId();
    } catch (error) {
      console.error(error);
    }
    this.userRefId &&
      this.firestore
        .collection('bookingOrders')
        .doc(`${this.userRefId}`)
        .set(data);
  }

  createUserProfileDocument = (userId: any) => {
    if (!userId) return;

    const userRef = this.firestore.collection('bookingOrders').doc(`${userId}`);
    console.log(userRef);
  };

  createDateScope() {
    const today = new Date();
    const currentYear = new Date().getFullYear();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    this.minDate = new Date(date);
    this.maxDate = new Date(currentYear + 0, 11, 31);

    return [this.minDate, this.maxDate];
  }

  createCancelForm() {
    return new FormGroup({
      uniqueId: new FormControl('')
    });
  }

  createId() {
    const generateId = uuidv4()
      .substring(0, 8)
      .toUpperCase();

    //  this.checkId(generateId);
    this.uniqueId = generateId;
  }

  returnId() {
    return this.uniqueId;
  }

  async checkIfUserBooked() {
    //  this.firestore.collection('bookingOrders').doc(`${this.userRefId}`)
    //    ? (this.userBooked = true)
    //    : (this.userBooked = false);
    //  let userBooked = false;
    //  console.log('test');

    await this.getUserId();
    await this.firestore
      .collection('bookingOrders')
      .doc(`${this.userRefId}`)
      .snapshotChanges()
      .pipe(first())
      .toPromise()
      .then(x => (this.isBooked = x.payload.exists));
    console.log(this.isBooked);
  }

  async getUserOrder() {
    await this.getUserId();
    await this.firestore
      .collection('bookingOrders')
      .doc(`${this.userRefId}`)
      .get()
      .toPromise()
      .then(x => (this.userOrder = x.data()));
    console.log(this.userOrder);
    return this.userOrder;
  }

  getBookStatus() {
    return this.isBooked;
  }

  //   checkId(generateId: string) {
  //     this.bookOrdersValue
  //       .pipe(first())
  //       .toPromise()
  //       .then(x => x.find(item => item.uniqueId === generateId))
  //       .then(x => {
  //         !x ? (this.uniqueId = generateId) : this.createId();
  //       });
  //   }

  //   async deleteBookingOrder(uniqueid: string) {
  //     let bookOrdersPromised = await this.bookOrders.pipe(first()).toPromise();
  //     this.allBookedItems = [];

  //     bookOrdersPromised.forEach(a => {
  //       let item = a.payload.doc.data();
  //       // console.log(a.payload.doc);
  //       item.id = a.payload.doc.id;
  //       this.allBookedItems.push(item);
  //     });

  //     const singleItem = this.allBookedItems.find(
  //       (item: CancelRequest) => item.uniqueId === uniqueid
  //     );
  //     singleItem && this.firestore.doc(`bookingOrders/${singleItem.id}`).delete();
  //     this.allBookedItems = [];
  //     bookOrdersPromised = [];

  //     console.log(this.allBookedItems);
  //     console.log(bookOrdersPromised);
  //     console.log(singleItem);
  //   }

  //   checkNumberOfTables() {
  //     const numberOfGuests: number[] = [1, 2, 3, 4, 5, 6];
  //     const timeAvalible: string[] = ['14:00', '16:00', '18:00', '20:00', '22:00'];
  //   }
}
