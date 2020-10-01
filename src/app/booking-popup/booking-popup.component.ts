import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactRequest } from '../models/booking-popup.model';
import { MenuService } from '../services/menu.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AuthService } from '../services/auth-service/auth.service';

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
  isDisabled: boolean = true;
  isSignedIn: boolean = false;

  minDate: Date;
  maxDate: Date;

  numberOfGuests: number[] = [1, 2, 3, 4, 5, 6];
  timeAvalible: string[] = ['14:00', '16:00', '18:00', '20:00', '22:00'];

  constructor(private menuService: MenuService, public authService: AuthService) {}

  ngOnInit(): void {
    this.menuService.createId();
    this.contactForm = this.menuService.createFormGroup();
    this.cancelForm = this.menuService.createCancelForm();

    const [min, max] = this.menuService.createDateScope();

    this.minDate = min;
    this.maxDate = max;

    //  if (this.authService.isLoggedIn === true) this.isSignedIn = true;
    this.menuService.checkUserIsLogged().then(res => {
      if (res) this.isSignedIn = true;
    });

    //  console.log(JSON.parse(localStorage.getItem('user')));
    console.log(this.isSignedIn);
  }

  async onSignUp(email: string, password: string) {
    await this.authService.signUp(email, password);

    if (this.authService.isLoggedIn) this.isSignedIn = true;
  }

  async onSignIn(email: string, password: string) {
    await this.authService.signIn(email, password);

    if (this.authService.isLoggedIn) this.isSignedIn = true;
  }

  getDate(event: MatDatepickerInputEvent<Date>) {
    //  console.log(event.value);
    //  return this.contactForm.get('date');
    if (event) this.isDisabled = false;

    console.log(this.isDisabled);
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
    //  this.menuService.deleteBookingOrder(this.cancelForm.value.uniqueId);
  }
}
