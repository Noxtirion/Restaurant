import { Component, ViewChild } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-main-background',
  templateUrl: './main-background.component.html',
  styleUrls: ['./main-background.component.scss'],
})
export class MainBackgroundComponent {
  @ViewChild('top') top: { nativeElement: any };

  constructor(private menuService: MenuService) {}

  ngAfterViewInit(): void {
    this.intersection(this.top.nativeElement);
  }

  intersection(element: HTMLElement) {
    const config = {
      rootMargin: '250px',
      threshold: 1.0,
    };

    this.menuService
      .fromIntersectionObserver(element, config)
      .subscribe((x) => {
        this.menuService.changeAnchorStatus(!x);
      });
  }
}
