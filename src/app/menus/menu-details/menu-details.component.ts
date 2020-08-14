import { Component, OnInit, OnDestroy } from '@angular/core';
import { PRODUCTS } from '../../models/database';
import { Products } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss']
})
export class MenuDetailsComponent implements OnInit, OnDestroy {
  public menuDetails: Products;
  public products: Products[] = PRODUCTS;
  private subscribe: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscribe = this.route.params.subscribe(
      params => (this.menuDetails = this.getMenu(params.id))
    );
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  getMenu(id: string) {
    return this.products.find(item => item.id === id);
  }
}
