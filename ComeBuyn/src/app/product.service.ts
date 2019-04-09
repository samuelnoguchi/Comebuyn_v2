import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  
  create(product){
    return this.db.list('/products').push(product);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(
      map(action => {
      return action.map(
        item => {
          const $key = item.payload.key;
          const data = { $key, ...item.payload.val() };
          return data;
      });
    }));
  }

//  data is returned as an observable with object structure:  
//  $key: string
//  category: string
//  imageUrl: string
//  numBuyersRequired: number
//  price: number
//  title: string


  get(productId){
    return this.db.object('/products/' + productId).valueChanges();
  }


}
