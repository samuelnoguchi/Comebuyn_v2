import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { map } from 'rxjs/operators';

@Component({
  selector: 'completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent {

  appUser:AppUser;
  status:string[];
  orders$: [Observable<Order>];
  quantities: number[] = [];
  
  orderIds:string[] = [];
  completedCircles:Product[] = [];

  constructor(private auth:AuthService, private orderService: OrderService) {
    this.auth.appUser$.subscribe(appUser=>{
      this.appUser = appUser;
      if(this.appUser.myOrders){
        this.orderIds = Object.keys(this.appUser.myOrders);
        this.status = Object.values(this.appUser.myOrders);
        this.getProductIds();
      }
    });
  }

  //Return list of products
  getProductIds(){
    this.orders$ = this.orderService.getAllByIds(this.orderIds);

    for (let pIndex = 0; pIndex < this.orders$.length; pIndex++){      
      this.orders$[pIndex].subscribe(o=>{
        // Set the key of the product
        o.product.$key = o.productId;
        this.getQuantity(o.product).subscribe(quanitiy=>{
          this.quantities[pIndex] = quanitiy;
        })
        this.completedCircles.push(o.product);
      });
    } 
  } 

  getQuantity(product){
    let quantity = 0;
    let userKey;
    
    return this.auth.getUserKey().pipe(
      map(key=>{
        for (let buyer of Object.values(product.buyers)){
          if(buyer === key){
            quantity++;
          }
        }
        return quantity;
      })
    );
  }
}
