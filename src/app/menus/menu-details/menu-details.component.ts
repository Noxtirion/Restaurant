import { Component, OnInit, OnDestroy } from '@angular/core';
import { Products } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss']
})
export class MenuDetailsComponent implements OnInit, OnDestroy {
  public menuDetails: Products;
  private subscribe: Subscription;

  constructor(private route: ActivatedRoute, private menuService: MenuService) {}

  ngOnInit() {
    this.subscribe = this.route.params.subscribe(
      params => (this.menuDetails = this.menuService.getMenu(params.id))
    );
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
