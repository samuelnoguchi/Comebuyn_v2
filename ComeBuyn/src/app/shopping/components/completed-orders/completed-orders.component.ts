import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent {

  appUser:AppUser;
  status:string[];
  orderIds:string[] = [];
  completedCircles:Product[];
  completedCircles$:[Observable<Product>];

  constructor(private auth:AuthService, private productService:ProductService) {
    this.auth.appUser$.subscribe(appUser=>{
      this.appUser = appUser;
      if(this.appUser.myOrders){
        this.orderIds = Object.keys(this.appUser.myOrders);
        this.status = Object.values(this.appUser.myOrders);
        this.getProductInfo();
        
      }
    });
  }

  //Not working

  //Return list of products
  getProductInfo(){
    this.completedCircles$ = this.productService.getAllByIds(this.orderIds);

    for (let pIndex = 0; pIndex < this.completedCircles$.length; pIndex++){      
      this.completedCircles$[pIndex].subscribe(p=>{
        p.$key = this.orderIds[pIndex]; // Set the product key
        this.updateProducts(p);
      });
    } 
  } 

  // Must determine if the product has already been added to the products list if it has, update, otherwise, add
  updateProducts(p:Product){
    let found = false;
    // Iterate through existing products in this.activeCircles
    for(let i=0; i<this.completedCircles$.length; i++){
      // If the product already exists, set found to true
      if(this.completedCircles[i].$key ==  p.$key){
        found = true;
        this.completedCircles[i] = p;
      }
    }

    // If the product does not already exists, add it to the list
    if(!found){
      this.completedCircles.push(p)
    }
    console.log(this.completedCircles)
  }

}
