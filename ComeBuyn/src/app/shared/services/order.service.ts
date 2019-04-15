import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import { Order } from 'shared/models/order';
import { UserService } from './user.service';
import { User } from 'firebase';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private userService:UserService) { }

  createFromProduct(product:Product, productId:string): Order{
    // Generate product
    let order:Order = {
      productId: productId,
      product: product
    }
    return order;
  }

  create(order:Order){
    return this.db.list('/orders').push(order);
  }

  
  // add order to a users myOrders object

  addOrderToUser(appUser, orderId):AppUser{
    // If user already has field
    if(appUser.myOrders){
      // If the order has not already been added to the appUser
      if(!appUser.myOrders.hasOwnProperty(orderId)){
        appUser.myOrders[orderId] = false;
      }
    }
    // Otherwise must initialize first
    else{
      appUser.myOrders = {};
      appUser.myOrders[orderId] = false;
    }
    return appUser;
  }

  /*  get() 

    Get single product in db, by productID

    Input: 
      productId: string
  
    Output: 
      AngularFireObject<Product>
  */

  get(orderId):AngularFireObject<Product>{
    return this.db.object('/orders/' + orderId);
  }


  /*  getAllByIds() 

    Get all products with given

    Input: 
      ids: string[]
  
    Output: 
      [AngularFireObject<Product>]
  */

  getAllByIds(ids:string[]):[Observable<any>] {
    let orders:[Observable<any>] = [Observable.of(null)];

    for (let id of ids){
      orders.push(this.get(id).valueChanges());
    }

    // Remove first null element if more elements exist
    if(orders.length > 1){
      orders.splice(0, 1);
    }    
    return orders;
  }

  getAll() {
    let afList = this.db.list('/orders');
    
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



}
