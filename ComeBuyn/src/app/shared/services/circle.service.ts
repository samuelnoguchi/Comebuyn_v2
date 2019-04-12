import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AppUser } from 'shared/models/app-user';
import { Product } from 'shared/models/product';
import { OrderService } from './order.service';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import { IfStmt } from '@angular/compiler';
import { $, promise } from 'protractor';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  constructor(
    private productService:ProductService, 
    private userService:UserService, 
    private orderService: OrderService) { 

  }

  /*--------------------------------------------------------------------------------
  joinCircle: The public method that joins a user to a circle

  First: Add the user to the circle, quantity number of times
  Second: If the user had filled the circle call completeCircle()

  Input: userId:string, product:Product, quanitiy:number, shippingInfo:{}
  Output: void
  ---------------------------------------------------------------------------------*/

  public joinCircle(userId:string, product:Product, quantity:number, shippingInfo:{}){
    
    let numBuyer = product.numBuyers;
    let buyer =  "buyer";
    let productId = product.$key;

    // Add circle to user
    this.addCircleToUser(userId, productId, quantity);

    let updating:Promise<void>;
    let totalInCirle = +product.numBuyers + +quantity;

    for (let i=0; i<quantity; i++){
      numBuyer++;
      // Generate buyer Id
      let buyerId = buyer + numBuyer;
      // Update the product
      product = this.addUserToCircle(buyerId, userId, product, shippingInfo);
      //Update in database
      updating = this.productService.update(productId, product);
    }

    // If order fills a circle  
    if(totalInCirle === product.numBuyersRequired){
      //Wait for update to finish
      updating.then(done=>{ 
        this.completeCircle(productId, product);
      });
    }
  }

  /*--------------------------------------------------------------------------------
  completeCircle: called when a user completes a circle

  First: Generate a new order based on the circle
  Second: Get ids of all user in circle
  Third: Remove the circle from the user
  Fourth: Add the order to the user 
  Fifth: Reset the circle

  Input: productId:string, product:Product
  Output: void
  ---------------------------------------------------------------------------------*/

  private completeCircle(productId:string, product:Product ){

    //Make new order
    let order = this.orderService.createFromProduct(product, productId);
    let orderId = this.orderService.create(order).key;

    // Remove circle from all users, add order

    let usersInCircle = new Set()

    // Generate unique list of users in circle
    for (let userId of Object.values(product.buyers)){
      usersInCircle.add(userId);
    }

    // Iterate over users in circle, removing the circle from the user and adding the order
    usersInCircle.forEach(userId=>{
      this.removeCircleFromUser(userId, productId).then(finished=>{
        this.orderService.addOrderToUser(userId, orderId);
      });
    });

    // Reset product
    this.resetCircle(productId,product);
  }

  /*--------------------------------------------------------------------------------
  resetCircle: called when a user completes a circle

  First: Reset the buyers list to empty object
  Second: Reset the numBuyers to 0

  Input: productId:string, product:Product
  Output: void
  ---------------------------------------------------------------------------------*/

  private resetCircle(productId:string, product:Product){
    product.buyers = {}
    product.numBuyers = 0;
    this.productService.update(productId, product);
  }

  /*--------------------------------------------------------------------------------
    removeCircleFromUser: called to remove a circle from a users myCircles object

    First: Get the user information 
    Second: Update the info, returning a promise for synchronization
  
    Input: userId:string, productId:string
    Output: Promise<void>
    ---------------------------------------------------------------------------------*/

  private removeCircleFromUser(userId, productId:string):Promise<void>{
    let promise:Promise<void>;
    
    this.userService.get(userId).valueChanges().take(1).subscribe(user=>{
     
    // Delete the circle, and return a promise  
    delete user.myCircles[productId];
    promise = this.userService.update(userId, user);
    });

    return promise;
  }

  // Add user to products list of buyers
  private addUserToCircle(buyerNumber:string, userId:string, product:Product, shippingInfo:{}): Product{
    // Add user id to product buyers list
    if(product.buyers){
      product.buyers[buyerNumber] = userId;
    }
    // Need to initalize buyers field if no current buyers
    else{
      product.buyers = {};
      product.buyers[buyerNumber] = userId;
    }

    // Increment the number of buyers
    product.numBuyers++;
    return product
  }

  // Add the circle to the users list of active circles
  private addCircleToUser(userId:string, productId:string, quantity:number){
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
