import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import { Order } from 'shared/models/order';
import { UserService } from './user.service';

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
  addOrderToUser(userId, orderId):Promise<void>{
    
    let promise: Promise<void>
    
    this.userService.get(userId).valueChanges().take(1).subscribe(user=>{

      // If user already has field
      if(user.myOrders){
        // If the order has not already been added to the user
        if(!user.myOrders.hasOwnProperty(orderId)){
          user.myOrders[orderId] = false;
        }
      }
      // Otherwise must initialize first
      else{
        user.myOrders = {};
        user.myOrders[orderId] = false;
      }

      promise = this.userService.update(userId, user);

    });

    return promise;
  }
}
