import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import { Order } from 'shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

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

}
