import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { CircleService } from 'shared/services/circle.service';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { OrderService } from 'app/shopping/services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnDestroy {


  product:Product= {
    $key:null,
    category:null,
    numBuyers:null,
    numBuyersRequired:null,
    price:null,
    buyers:{
      
    },
    imageUrl:null,
    title:null
  };

  quantity:number;
  productId:string;
  
  paramSub: Subscription;
  productSub: Subscription;

  price:number;
  tax:number;
  total:number;

  constructor(
    private productService: ProductService, 
    private orderService: OrderService, 
    private route: ActivatedRoute,
    ) {
    
    // Subscribe to get the route parameters 
    this.paramSub = route.queryParams.subscribe(params => {
    this.productId = params.productId;
    this.quantity = params.quantity;
    });

    // Get the product
    this.productSub = productService.get(this.productId).valueChanges().subscribe(product => {
      this.product = product;
      this.product.$key = this.productId;
      console.log(product)
      this.calculatePrice();
    });

  }

  // Calculate price, tax, total
  calculatePrice() {
    this.price =  this.product.price * this.quantity;
    this.tax = this.price * 0.13;
    this.total = this.price + this.tax;
  }

  // Place order
  order(shippingInfo) {
    this.orderService.order(this.product, this.quantity, shippingInfo);
    
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.productSub.unsubscribe();
  }

}
