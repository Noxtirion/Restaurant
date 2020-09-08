import { Injectable } from '@angular/core';
import { PRODUCTS } from '../models/database';
import { Products } from '../models/product';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private products: Products[] = PRODUCTS;
  private items: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('test collection').valueChanges();
  }

  getMenu(id: string) {
    this.items.subscribe(x => console.log(x));
    return this.products.find(item => item.id === id);
  }
}
