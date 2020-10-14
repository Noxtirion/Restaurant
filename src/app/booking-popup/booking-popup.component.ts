import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactRequest } from '../models/booking-popup.model';
import { MenuService } from '../services/menu.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-booking-popup',
  templateUrl: './booking-popup.component.html',
  styleUrls: ['./booking-popup.component.scss']
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

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.createId();
    this.contactForm = this.menuService.createFormGroup();
    this.cancelForm = this.menuService.createCancelForm();

    const [min, max] = this.menuService.createDateScope();

    this.minDate = min;
    this.maxDate = max;

    this.menuService.checkUserIsLogged().then(res => {
      if (res) this.isSignedIn = true;
    });
  }

  getDate(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);

    if (event) this.isDisabled = false;
  }

  onSubmit() {
    this.uniqueId = this.menuService.returnId();

    console.log(this.uniqueId);
    // Deep copy of the form-model
    const result: ContactRequest = Object.assign({}, this.contactForm.value);
    result.uniqueId = this.uniqueId;
    result.date = new Date(result.date).toDateString();

    this.menuService.createBookingOrder(result);
    this.menuService.changeOrder(result);
    this.menuService.changeMenu(result.numberOfGuests);
    
    this.contactForm.reset();
    console.log(result);
  }
}
