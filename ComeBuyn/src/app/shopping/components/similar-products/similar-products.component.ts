import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent implements OnInit {
  products$;
  constructor(private productService: ProductService) { 
    this.products$ = productService.getPopular();
  }

  ngOnInit() {
  }

}
