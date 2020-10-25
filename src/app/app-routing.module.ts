import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MenusComponent } from './menus/menus.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { MenuDetailsComponent } from './menus/menu-details/menu-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';

const routes: Routes = [
  { path: '', component: MenusComponent },
  { path: 'menus', component: MenusComponent },
  { path: 'menu/:id', component: MenuDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
