import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainBackgroundComponent } from './main-background/main-background.component';
import { MenusComponent } from './menus/menus.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { MenuDetailsComponent } from './menus/menu-details/menu-details.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { SpinnerComponent } from './spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingPopupComponent } from './booking-popup/booking-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MenuService } from './services/menu.service';
import { LogInComponent } from './log-in/log-in.component';

export function bookingProviderFactory(menuService: MenuService) {
  return () => menuService.checkIfUserBooked();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainBackgroundComponent,
    MenusComponent,
    AboutComponent,
    GalleryComponent,
    ContactComponent,
    MenuDetailsComponent,
    SpinnerComponent,
    BookingPopupComponent,
    UserProfileComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MenuService,
    {
      provide: APP_INITIALIZER,
      useFactory: bookingProviderFactory,
      deps: [MenuService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
