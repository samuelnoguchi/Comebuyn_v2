import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  categories$;

  constructor(productService: ProductService, private categoryService: CategoryService) { 
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();


    categoryService.getAll().subscribe(a=>console.log(a))


  }

  
}
