import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map, switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

//-------------------- CREATE Functions ----------------------//
  
  create(product){
    // Add field for number of buyers
    product.numBuyers = 0;
    return this.db.list('/products').push(product);
  }

//-------------------- READ Functions ----------------------//


  /*  getAll() 
      Get all producdts in db
      Input: none
    
      Output: list of all products in db, with form:
        $key: string
        category: string
        imageUrl: string
        numBuyers: number
        numBuyersRequired: number
        price: number
        title: string
  */

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

/*  getAllByCategory() 
  Get all products in db with correct category
  Input: category:string
 
  Output: (list of all products in db with category matching input, with form)
    data {
      $key: string
      category: string
      imageUrl: string
      numBuyers: number
      numBuyersRequired: number
      price: number
      title: string
    }  
*/

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

  /*  getAllByIds() 
  Get all products with given
  Input: 
    ids: string[]
 
  Output: 
    [AngularFireObject<Product>]
*/

  getAllByIds(ids:string[]):[Observable<Product>] {
    let products:[Observable<Product>] = [Observable.of(null)];

    for (let id of ids){
      products.push(this.get(id).valueChanges());
    }

    // Remove first null element if more elements exist
    if(products.length > 1){
      products.splice(0, 1);
    }
    
    return products;
  }

  /*  getAll() 
      Get all producdts in db
      Input: none
    
      Output: list of all products in db, with form:
        $key: string
        category: string
        imageUrl: string
        numBuyers: number
        numBuyersRequired: number
        price: number
        title: string
  */

 getPopular() {
  let afList = this.db.list('/products' , ref => ref.limitToFirst(4));
  
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


/*  get() 
  Get single product in db, by productID
  Input: 
    productId: string
 
  Output: 
    AngularFireObject<Product>
*/

  get(productId):AngularFireObject<Product>{
    return this.db.object('/products/' + productId);
  }



//-------------------- UPDATE Functions ----------------------//

  update(productId, product) {

     //If product has key in it, remove (db cant take key)
    if(product.$key){
      delete product.$key;
    }
   
    return this.db.object('/products/' + productId).update(product);
  }

//-------------------- DELETE Functions ----------------------//

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }

}