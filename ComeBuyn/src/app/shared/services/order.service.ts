import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import { Order } from 'shared/models/order';
import { UserService } from './user.service';
import { User } from 'firebase';
import { AppUser } from 'shared/models/app-user';

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
}
