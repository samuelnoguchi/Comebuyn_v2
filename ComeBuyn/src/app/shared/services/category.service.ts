import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  observableCategories$: any;

  constructor(private db: AngularFireDatabase) {
    this.observableCategories$ = this.db.list('/categories', ref => ref.orderByChild('name'));
   }

  getAll() {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().pipe(
      map(action=> {
        return action.map(
          item=>{
            const $key = item.payload.key;
            const data = { $key, ...item.payload.val() };
            return data;
          }
        )
      })
    )
  }

//  data is returned as an observable with object structure:  
//  $key: string
//  name: string

  getAll2() {
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



}
