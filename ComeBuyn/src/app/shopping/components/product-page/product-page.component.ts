import { Component, OnInit } from '@angular/core';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  productId: string;
  product:Product={
    $key:null,
    category:null,
    numBuyers:null,
    numBuyersRequired:null,
    price:null,
    imageUrl:null,
    title:null
  };
  numAvailable:number[];
  image:string;
  quantitySelection: number;

  constructor(private productService: ProductService, private route: ActivatedRoute) { 
      // Subscribe to the route
      route.queryParamMap.subscribe(params => {
        this.productId = params.get('productId');
      });

      this.quantitySelection = 1;
      this.image = "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png" // default

      productService.get(this.productId).valueChanges().subscribe(
        product=> {
          this.product = product;
          this.image = this.product.imageUrl;
          this.numAvailable = Array(this.product.numBuyersRequired).fill(0).map((x,i)=>i+1);
       
        }
      );

      

    }
}
