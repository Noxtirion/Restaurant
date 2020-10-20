import { Component, ViewChild } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-main-background',
  templateUrl: './main-background.component.html',
  styleUrls: ['./main-background.component.scss'],
})
export class MainBackgroundComponent {
  @ViewChild('top') top: { nativeElement: any };

  constructor(private sharedService: SharedService) {}

  ngAfterViewInit(): void {
    this.intersection(this.top.nativeElement);
  }

  intersection(element: HTMLElement) {
    const config = {
      rootMargin: '250px',
      threshold: 1.0,
    };

    this.sharedService
      .fromIntersectionObserver(element, config)
      .subscribe((x) => {
        this.sharedService.changeAnchorStatus(!x);
      });
  }
}
