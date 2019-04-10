import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';


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

//  data is returned as an observable with object structure:  
//  $key: string
//  category: string
//  imageUrl: string
//  numBuyersRequired: number
//  price: number
//  title: string

  getAll() {
    let afList = this.db.list('/products');
    
    return afList.snapshotChanges().pipe(
      map(action => {
      return action.map(
        item => {
          //console.log(item.payload.val())
          const $key = item.payload.key;
          const data = { $key, ...item.payload.val() };
          
          //console.log(data)
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

  getAllByCategory(category:string) {
    let afList = this.db.list('/products', ref=> ref.orderByChild('category').equalTo(category));
    
    return afList.snapshotChanges().pipe(
      map(action => {
      return action.map(
        item => {
          const $key = item.payload.key;
          const data = { $key, ...item.payload.val() };
          return data;
      });
    }));
  }


  get(productId):AngularFireObject<Product>{
    return this.db.object('/products/' + productId);
  }


}
