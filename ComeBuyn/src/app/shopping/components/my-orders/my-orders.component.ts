import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  appUser:AppUser;
  
  circles:string[];
  quantities:number[];
  activeCircles:Product[] =[];
  activeCircles$:[Observable<Product>];


  constructor(private auth: AuthService, private productService: ProductService) { 
    this.auth.appUser$.subscribe(appUser=>{
      this.appUser = appUser;
      if(this.appUser.myCircles){
        this.circles = Object.keys(this.appUser.myCircles);
        this.quantities = Object.values(this.appUser.myCircles);
        this.activeCircles$ = this.productService.getAllByIds(this.circles);
        this.getActiveCircles();
      }
    });
  }

  getActiveCircles(){
    for (let pIndex = 0; pIndex < this.activeCircles$.length; pIndex++){      
      this.activeCircles$[pIndex].take(1).subscribe(p=>{
        p.$key = this.circles[pIndex];
        this.activeCircles.push(p);
      });
    } 
  }

  ngOnInit() {
  }

}
