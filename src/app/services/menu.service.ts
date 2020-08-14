import { Injectable } from '@angular/core';
import { PRODUCTS } from '../models/database';
import { Products } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private products: Products[] = PRODUCTS;

  constructor() {}

  getMenu(id: string) {
    return this.products.find(item => item.id === id);
  }
}
