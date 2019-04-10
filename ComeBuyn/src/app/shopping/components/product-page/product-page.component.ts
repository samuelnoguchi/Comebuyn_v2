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

  constructor(private productService: ProductService, private route: ActivatedRoute) { 
      // Subscribe to the route
      route.queryParamMap.subscribe(params => {
        this.productId = params.get('productId');
      });

      productService.get(this.productId).valueChanges().subscribe(
        product=> this.product = product
      );
    }
}
