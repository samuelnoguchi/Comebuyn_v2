import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AppUser } from 'shared/models/app-user';
import { Product } from 'shared/models/product';
import { OrderService } from './order.service';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  constructor(
    private productService:ProductService, 
    private userService:UserService, 
    private orderService: OrderService) { 

  }

  // Add a user to a circle
  public joinCircle(userId:string, product:Product, quantity:number, shippingInfo:{}){
    
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

      // If order fills a circle
      if(numBuyer == product.numBuyersRequired){
        this.completeCircle(productId, product);
      }
      numBuyer++;
    }
  }

  // Create an order from a filled circle, and reset the circle
  private completeCircle(productId:string, product:Product ){

    //Make new order
    let order = this.orderService.createFromProduct(product, productId);
    let orderId = this.orderService.create(order).key;

    // Remove circle from all users, add order
    for (let userId of Object.values(product.buyers)){
      this.removeCircleFromUser(userId, productId);
      this.orderService.addOrderToUser(userId, orderId);
    }

   
    // Reset product
    this.resetCircle(productId,product);
    
  }

  // Reset a product to 0 buyers
  private resetCircle(productId:string, product:Product){
    product.buyers = {}
    product.numBuyers = 0;
    this.productService.update(productId, product);
  }

  // Remove a circle from a users list of active circles
  private removeCircleFromUser(userId, productId:string){
    this.userService.get(userId).valueChanges().take(1).subscribe(user=>{
      // If the product exists in the users circle, remove it 
      if(user.myCircles[productId]){
        delete user.myCircles[productId];
        this.userService.update(userId, user);
       } 
    });

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
