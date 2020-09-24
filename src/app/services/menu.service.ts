import { Injectable } from '@angular/core';
// import { PRODUCTS } from '../models/database';
// import { Products } from '../models/product';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, pipe } from 'rxjs';
import { first } from 'rxjs/operators';
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
  canceledBook: ContactRequest;
  allBookedItems: any;
  uniqueId: string;

  constructor(private firestore: AngularFirestore) {
    this.items = this.firestore.collection('menus').valueChanges();
    this.bookOrders = this.firestore.collection('bookingOrders').snapshotChanges();
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
      date: new FormControl('', [Validators.required]),
      timeAvalible: new FormControl(null, [Validators.required]),
      numberOfGuests: new FormControl(null, [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      uniqueId: new FormControl(this.uniqueId)
    });
  }

  createCancelForm() {
    return new FormGroup({
      uniqueId: new FormControl('')
    });
  }

  createBookingOrder(data: ContactRequest) {
    this.firestore.collection('bookingOrders').add(data);
  }

  createId() {
    this.uniqueId = uuidv4()
      .substring(0, 8)
      .toUpperCase();
  }

  returnId() {
    return this.uniqueId;
  }

  async deleteBookingOrder(uniqueid: string) {
    let bookOrdersPromised = await this.bookOrders.pipe(first()).toPromise();
    this.allBookedItems = [];

    bookOrdersPromised.forEach(a => {
      let item = a.payload.doc.data();
      item.id = a.payload.doc.id;
      this.allBookedItems.push(item);
    });

    const singleItem = this.allBookedItems.find(
      (item: CancelRequest) => item.uniqueId === uniqueid
    );
    singleItem && this.firestore.doc(`bookingOrders/${singleItem.id}`).delete();
    this.allBookedItems = [];
    bookOrdersPromised = [];

    console.log(this.allBookedItems);
    console.log(bookOrdersPromised);
    console.log(singleItem);
  }
}
