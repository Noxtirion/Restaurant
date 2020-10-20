import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private items: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.items = this.firestore.collection('menus').valueChanges();
  }

  async getMenu(id: string): Promise<any> {
    return this.items
      .pipe(first())
      .toPromise()
      .then((x) => x.find((item) => item.id === id))
      .then((x) => x);
  }
}
