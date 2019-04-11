import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  appUser:AppUser;
  circles:string[];
  quantities:number[];
  products:Product[] =[];
  products$:[Observable<Product>];

  constructor(private auth: AuthService, private productService: ProductService) { 
    this.auth.appUser$.subscribe(appUser=>{
      this.appUser = appUser;
      if(this.appUser.myCircles){
        this.circles = Object.keys(this.appUser.myCircles);
        this.quantities = Object.values(this.appUser.myCircles);
        this.products$ = this.productService.getAllByIds(this.circles);
        this.getProducts();
      }
    });
  }

  getProducts(){
    for (let pIndex = 0; pIndex < this.products$.length; pIndex++){
      this.products$[pIndex].subscribe(p=>{
        // Set the key of the producdt
        p.$key = this.circles[pIndex];
        this.products.push(p);
      });
    } 
  }


  ngOnInit() {
  }

}
