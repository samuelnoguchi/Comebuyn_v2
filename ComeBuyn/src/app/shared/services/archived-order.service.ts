import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Order } from 'shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class ArchivedOrderService {

  constructor(private db: AngularFireDatabase) { }

  create(order:Order){
    return this.db.list('/archived-orders').push(order);
  }
}
