import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactRequest } from '../models/booking-popup.model';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-booking-popup',
  templateUrl: './booking-popup.component.html',
  styleUrls: ['./booking-popup.component.scss']
})
export class BookingPopupComponent implements OnInit {
  contactForm: FormGroup;
  cancelForm: FormGroup;
  uniqueId: string;
  cancel: boolean = false;

  minDate: Date;
  maxDate: Date;

  numberOfGuests: number[] = [1, 2, 3, 4, 5, 6];
  timeAvalible: string[] = ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  constructor(private menuService: MenuService) {
    const today = new Date();
    const currentYear = new Date().getFullYear();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    this.minDate = new Date(date);
    this.maxDate = new Date(currentYear + 0, 11, 31);
  }

  ngOnInit(): void {
    this.menuService.createId();
    this.contactForm = this.menuService.createFormGroup();
    this.cancelForm = this.menuService.createCancelForm();
  }

  onSubmit() {
    this.uniqueId = this.menuService.returnId();

    console.log(this.uniqueId);
    // Deep copy of the form-model
    const result: ContactRequest = Object.assign({}, this.contactForm.value);

    result.uniqueId = this.uniqueId;

    this.menuService.createBookingOrder(result);

    this.contactForm.reset();
    console.log(result);
  }

  openCancel() {
    this.cancel = true;
  }

  onCancel() {
    this.menuService.deleteBookingOrder(this.cancelForm.value.uniqueId);
  }
}
