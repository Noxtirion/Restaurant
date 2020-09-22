import { Injectable } from '@angular/core';
// import { PRODUCTS } from '../models/database';
import { Products } from '../models/product';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ContactRequest } from '../models/booking-popup.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  //   private products: Products[];
  private items: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.items = this.firestore.collection('menus').valueChanges();

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

  getMenu(id: string): Promise<any> {
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
      lastName: new FormControl('', [Validators.required])
    });
  }

  createBookingOrder(data: ContactRequest) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('bookingOrders')
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }
}
