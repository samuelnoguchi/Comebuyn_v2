import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';

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
    imageUrl:null,
    title:null
  };
  quantity:number;
  productId:string;
  paramSub: Subscription;

  price:number;
  tax:number;
  total:number;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.paramSub = route.queryParams.subscribe(params => {
      this.productId = params.productId;
      this.quantity = params.quantity;
    });

    productService.get(this.productId).valueChanges().subscribe(product=>{
      this.product = product;
      this.calculatePrice();
    })
  }

  calculatePrice() {
    this.price =  this.product.price * this.quantity;
    this.tax = this.price * 0.13;
    this.total = this.price + this.tax;
  }

  joinCircle(){
    console.log("hi");
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }

}
