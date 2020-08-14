import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MenusComponent } from './menus/menus.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { MenuDetailsComponent } from './menus/menu-details/menu-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/menus', pathMatch: 'full' },
  { path: 'menus', component: MenusComponent },
  { path: 'menu/:id', component: MenuDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactComponent }
  //   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
