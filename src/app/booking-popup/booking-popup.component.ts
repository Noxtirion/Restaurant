import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactRequest } from '../models/booking-popup.model';
import { SharedService } from '../services/shared.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-booking-popup',
  templateUrl: './booking-popup.component.html',
  styleUrls: ['./booking-popup.component.scss'],
})
export class BookingPopupComponent implements OnInit {
  contactForm: FormGroup;
  cancelForm: FormGroup;
  uniqueId: string;
  isDisabled: boolean = true;
  isSignedIn: boolean = false;
  isBooked: boolean = false;

  minDate: Date;
  maxDate: Date;

  numberOfGuests: number[] = [1, 2, 3, 4, 5, 6];
  timeAvalible: string[] = ['14:00', '16:00', '18:00', '20:00', '22:00'];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.createId();
    this.contactForm = this.sharedService.createFormGroup();
    this.cancelForm = this.sharedService.createCancelForm();

    const [min, max] = this.sharedService.createDateScope();

    this.minDate = min;
    this.maxDate = max;

    this.sharedService.checkUserIsLogged().then((res) => {
      if (res) this.isSignedIn = true;
    });
  }

  getDate(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);

    if (event) this.isDisabled = false;
  }

  onSubmit() {
    this.uniqueId = this.sharedService.returnId();

    console.log(this.uniqueId);
    // Deep copy of the form-model
    const result: ContactRequest = Object.assign({}, this.contactForm.value);
    result.uniqueId = this.uniqueId;
    result.date = new Date(result.date).toDateString();

    this.sharedService.createBookingOrder(result);
    this.sharedService.changeOrder(result);
    this.sharedService.changeMenu(result.numberOfGuests);

    this.contactForm.reset();
    console.log(result);
  }
}
