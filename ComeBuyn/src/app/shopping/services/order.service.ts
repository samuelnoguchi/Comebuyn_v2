import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { ProductService } from 'shared/services/product.service';
import { CircleService } from 'shared/services/circle.service';
import { Product } from 'shared/models/product';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private auth: AuthService, private circleService: CircleService) { }

  order(product:Product, quantity:number, shippingInfo){
    
    // Get the uid of the current user
    this.auth.getUserKey().take(1).subscribe(uid=>{

    
      // Join the circle multiple times depending on quantity
      
        this.circleService.joinCircle(uid, product, quantity, shippingInfo);
      
      // Do other things
    });
  }

}
