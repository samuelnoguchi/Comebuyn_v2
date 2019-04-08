import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  observableCategories$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.observableCategories$ = this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
   }

  getCategories() {
    return this.observableCategories$;
  }
}
