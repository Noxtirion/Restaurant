import { Component, OnInit } from '@angular/core';
import { OFFER } from '../models/database';
import { Offer } from '../models/product';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {
  products: Offer[] = OFFER;

  constructor() {}

  ngOnInit(): void {}
}
