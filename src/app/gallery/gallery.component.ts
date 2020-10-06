import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    //  this.menuService.isLogged.subscribe(x => console.log(x));
  }
}
