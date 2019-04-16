import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Order } from 'shared/models/order';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivedOrderService {

  constructor(private db: AngularFireDatabase) { }

  create(order:Order){
    return this.db.list('/archived-orders').push(order);
  }

  getAll() {
    let afList = this.db.list('/archived-orders');
    
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

  getAllByIds(ids:string[]):[Observable<Order>] {
    let orders:[Observable<Order>] = [Observable.of(null)];

    for (let id of ids){
      orders.push(this.get(id).valueChanges());
    }

    // Remove first null element if more elements exist
    if(orders.length > 1){
      orders.splice(0, 1);
    }    
    return orders;
  }

  get(orderId):AngularFireObject<Order>{
    return this.db.object('/archived-orders/' + orderId);
  }



}
