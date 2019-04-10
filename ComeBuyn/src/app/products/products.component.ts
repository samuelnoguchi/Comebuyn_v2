import { Component } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  category: string;

  constructor(productService: ProductService, private route: ActivatedRoute) { 
    // Get all products
    this.products$ = productService.getAll();
    
    // Subscribe to the route
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      //If a category has been selected
      if(this.category) {
        this.products$ = productService.getAllByCategory(this.category);
      }
      // Otherwise get all products
      else{
        this.products$ = productService.getAll();
      }
    }
  )}
}
