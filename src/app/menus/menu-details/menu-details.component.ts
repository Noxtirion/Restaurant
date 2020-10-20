import { Component, OnInit, OnDestroy } from '@angular/core';
import { Products } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenusService } from '../menus.service';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss'],
})
export class MenuDetailsComponent implements OnInit, OnDestroy {
  menuDetails: Products;
  private subscribe: Subscription;
  spinner: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private menusService: MenusService
  ) {}

  ngOnInit() {
    this.subscribe = this.route.params.subscribe((params) =>
      this.menusService.getMenu(params.id).then((x) => {
        this.menuDetails = x;
        this.spinner = false;
      })
    );
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
