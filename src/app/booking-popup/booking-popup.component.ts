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

  public numberOfGuests: number[] = [1, 2, 3, 4, 5, 6];
  public timeAvalible: string[] = [
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ];

  constructor(private menuService: MenuService) {
    this.contactForm = this.menuService.createFormGroup();
  }

  ngOnInit(): void {}

  onSubmit() {
    // Deep copy of the form-model
    const result: ContactRequest = Object.assign({}, this.contactForm.value);

    this.menuService.createBookingOrder(result);

    console.log(result);
  }
}
