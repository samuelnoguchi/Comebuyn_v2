import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  percent:number;

  @Input('product') product:Product;
  constructor() { 
    
    
  }

}
