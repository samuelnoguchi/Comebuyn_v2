import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-active-circles',
  templateUrl: './active-circles.component.html',
  styleUrls: ['./active-circles.component.css']
})
export class ActiveCirclesComponent {

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
        this.getProductInfo();      
      }
    });
  }

  //Return list of products
  getProductInfo(){
    this.activeCircles$ = this.productService.getAllByIds(this.circles);

    for (let pIndex = 0; pIndex < this.activeCircles$.length; pIndex++){      
      this.activeCircles$[pIndex].subscribe(p=>{
        p.$key = this.circles[pIndex]; // Set the product key
        //this.activeCircles.push(p);
        this.updateProducts(p);
      });
    } 
  }

  // Must determine if the product has already been added to the products list if it has, update, otherwise, add
  updateProducts(p:Product){
    let found = false;
    // Iterate through existing products in this.activeCircles
    for(let i=0; i<this.activeCircles.length; i++){
      // If the product already exists, set found to true
      if(this.activeCircles[i].$key ==  p.$key){
        found = true;
        this.activeCircles[i] = p;
      }
    }

    // If the product does not already exists, add it to the list
    if(!found){
      this.activeCircles.push(p)
    }
  }

}
