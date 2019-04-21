import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { CheckOutService } from 'app/shopping/services/check-out.service';

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
    buyers:{},
    tags:{},
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
    private checkOutService: CheckOutService, 
    private route: ActivatedRoute,
    private router: Router
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
    this.checkOutService.order(this.product, this.quantity, shippingInfo);
    this.router.navigate(['/order-success'])
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.productSub.unsubscribe();
  }

}
