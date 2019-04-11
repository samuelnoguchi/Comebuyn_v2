import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AppUser } from 'shared/models/app-user';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  constructor(private productService:ProductService, private userService:UserService) { 

  }

  // Add a user to a circle
  joinCircle(userId:string, product:Product, quantity:number, shippingInfo:{}){
    
    let numBuyer = product.numBuyers + 1;
    let buyer =  "buyer";
    let productId = product.$key;

    // Add circle to user
    this.addCircleToUser(userId, productId, quantity);

  
    // Add user to circle for the quantity specified
    for (let i=0; i<quantity; i++){
      // Generate buyer Id
      let buyerId = buyer + numBuyer;

      // Update the product
      product = this.addUserToCircle(buyerId, userId, product, shippingInfo);
      // Update in database
      this.productService.update(productId, product);
      numBuyer++;
    }
  }

  addUserToCircle(buyerId:string, userId:string, product:Product, shippingInfo:{}): Product{
    // Add user id to product buyers list
    if(product.buyers){
      product.buyers[buyerId] = userId;
    }
    // Need to initalize buyers field if no current buyers
    else{
      product.buyers  = {};
      product.buyers[buyerId] = userId;
    }

    // Increment the number of buyers
    product.numBuyers++;
    return product
  }

  addCircleToUser(userId:string, productId:string, quantity:number){
    this.userService.get(userId).valueChanges().take(1).subscribe(user=>{

      //Add product Id to user 
      if(user.myCircles){
        
        // If the user has already entered this circle
        if(user.myCircles.hasOwnProperty(productId)){
          let numAlreadyBought: number = user.myCircles[productId];
          let numBought: number = +numAlreadyBought + +quantity;
          user.myCircles[productId] = numBought;
        }
        else{
          user.myCircles[productId] = quantity;
        }
      }
      // If no circles are entered yet, initialize the object first
      else{
        user.myCircles = {};
        user.myCircles[productId] = quantity;
      }

      // Update user info
      this.userService.update(userId, user);
    });
  }
}