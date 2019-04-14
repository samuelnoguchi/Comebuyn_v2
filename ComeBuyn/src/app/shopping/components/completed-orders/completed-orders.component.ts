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
export class CompletedOrdersComponent implements OnInit {

  appUser:AppUser;
  status:boolean[];
  orderIds:string[];
  completedCircles:Product[] =[];
  completedCircles$:[Observable<Product>];

  constructor(private auth:AuthService, private productService:ProductService) {
    this.auth.appUser$.subscribe(appUser=>{
      this.appUser = appUser;
      if(this.appUser.myOrders){
        this.orderIds = Object.keys(this.appUser.myOrders)
        console.log(this.orderIds)
        
    }
  });


   }

  ngOnInit() {
  }

}
