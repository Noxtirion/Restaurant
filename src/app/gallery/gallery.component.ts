import { Component, OnInit } from '@angular/core';
import { GALLERY } from '../models/database';
import { Gallery } from '../models/product';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  galleryImages: Gallery[] = GALLERY;

  constructor() {}

  ngOnInit(): void {}
}
