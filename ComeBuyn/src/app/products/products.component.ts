import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../modules/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  filteredProducts: {}[];
  categories$;
  category: string;

  constructor(productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) { 
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
    
    route.queryParamMap.subscribe(params => {
      console.log(params);
      this.category = params.get('category');
      console.log(this.category)
      if(this.category) {
        this.products$ = productService.getAllByCategory(this.category);
      }
    }
  )}
}
