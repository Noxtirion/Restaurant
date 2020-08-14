import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../models/database';
import { Products } from '../models/product';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  public products: Products[] = PRODUCTS;

  constructor() {}

  ngOnInit(): void {}
}
