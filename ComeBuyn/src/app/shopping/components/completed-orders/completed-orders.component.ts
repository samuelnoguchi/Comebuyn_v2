import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { Product } from 'shared/models/product';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { map, isEmpty } from 'rxjs/operators';

@Component({
  selector: 'completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent {

  quantitySub:Subscription;

  appUser:AppUser;
  status:string[];
  orders$: [Observable<Order>];
  quantities: number[] = [];
  
  orderIds:string[] = [];
  completedCircles:Product[] = [];

  constructor(private auth:AuthService, private orderService: OrderService) {
    this.auth.appUser$.subscribe(appUser=>{
      this.appUser = appUser;

      // Removed the archived orders from the orders to check
      let completedOrders = this.removeArchived();
      
      // If the user has orders
      if(completedOrders != null && !this.isEmpty(completedOrders)){
        console.log("hi")

        this.orderIds = Object.keys(completedOrders);
        this.status = Object.values(completedOrders);
        this.getProductIds();
      }
    });
  }

  isEmpty(ob:Object):boolean{
    let numKeys = 0;
    for (let key of Object.keys(ob)){
      numKeys++;
    }
    return numKeys == 0 ? true: false;
  }

  removeArchived(){
    let notArchived = this.appUser.myOrders;
    for (let order of Object.keys(notArchived)){
      if(notArchived[order] === true){
        delete notArchived[order]
      }
    }
    return notArchived;
  }

  //Return list of products
  getProductIds(){
    this.orders$ = this.orderService.getAllByIds(this.orderIds);

    for (let pIndex = 0; pIndex < this.orders$.length; pIndex++){      
      this.orders$[pIndex].subscribe(o=>{
        // Set the key of the product
        o.product.$key = o.productId;
        this.quantitySub = this.getQuantity(o.product).take(1).subscribe(quanitiy=>{
          this.quantities[pIndex] = quanitiy;
        })
        this.completedCircles.push(o.product);
      });
    } 
  } 

  getQuantity(product){
    let quantity = 0;
    
    return this.auth.getUserKey().pipe(
      map(key=>{
        for (let buyer of Object.values(product.buyers)){
          let buyerId = buyer['id'];
          if(buyerId === key){
            quantity++;
          }
        }
        return quantity;
      })
    );
  }

}