import { Component, OnInit } from '@angular/core';
import { OFFER } from '../models/database';
import { Offer } from '../models/product';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {
  products: Offer[] = OFFER;

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {}

  onClickScroll(elementId: string): void {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(elementId);
    }, 0);
  }
}
