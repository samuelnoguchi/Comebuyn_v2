import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent {
  products$;

  constructor(private productService:ProductService) { 
    this.products$ = productService.getPopular();
  }

  

}
