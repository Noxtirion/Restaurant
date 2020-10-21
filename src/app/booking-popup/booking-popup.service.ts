import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { ContactRequest } from '../models/booking-popup.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class BookingPopupService {
  uniqueId: string;
  minDate: Date;
  maxDate: Date;
  private userRefId: any = null;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private sharedService: SharedService
  ) {}

  createFormGroup() {
    return new FormGroup({
      date: new FormControl('', [Validators.required]),
      timeAvalible: new FormControl(null, [Validators.required]),
      numberOfGuests: new FormControl(null, [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      uniqueId: new FormControl(''),
    });
  }

  createId() {
    const generateId = uuidv4().substring(0, 8).toUpperCase();
    this.uniqueId = generateId;
  }

  returnId() {
    return this.uniqueId;
  }

  createDateScope() {
    const today = new Date();
    const currentYear = new Date().getFullYear();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      (today.getDate() + 1);

    this.minDate = new Date(date);
    this.maxDate = new Date(currentYear + 0, 11, 31);

    return [this.minDate, this.maxDate];
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
      await this.sharedService.getUserId().then((x) => {
        this.userRefId = x;
        console.log(this.userRefId);
      });
    } catch (error) {
      console.error(error);
    }
    this.userRefId &&
      this.firestore
        .collection('bookingOrders')
        .doc(`${this.userRefId}`)
        .set(data);
  }
}
