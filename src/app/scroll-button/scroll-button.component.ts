import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scroll-button',
  templateUrl: './scroll-button.component.html',
  styleUrls: ['./scroll-button.component.scss'],
})
export class ScrollButtonComponent implements OnInit {
  anchor: boolean;
  private subscribe: Subscription;

  constructor(
    private sharedService: SharedService,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.getAnchorStatus();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  getAnchorStatus() {
    this.subscribe = this.sharedService
      .getAnchorStatus()
      .subscribe((x) => (this.anchor = x));
  }

  onClickScroll(elementId: string): void {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(elementId);
    }, 0);
  }
}
