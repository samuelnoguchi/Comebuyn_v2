import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take'; // Use to take 1 value, dont need to unsubscribe after
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  id;
  categories$;
  product:Product={
    $key:null,
    category:null,
    numBuyers:null,
    numBuyersRequired:null,
    price:null,
    imageUrl:null,
    title:null
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.categories$ = categoryService.getAll();

      this.categories$.subscribe(
        action =>{
          console.log(action)
        }
      ) 

      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) this.productService.get(this.id).valueChanges().take(1)
        .subscribe(p=> {
          this.product = p
          console.log(this.product);
        });

  }

  // Takes json object generated by ngForm
  save(product) {
    if(this.id) this.productService.update(this.id, product); // If we are editing a product, call the update method
    else this.productService.create(product); // Otherwise call the create method

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return; 
      
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
