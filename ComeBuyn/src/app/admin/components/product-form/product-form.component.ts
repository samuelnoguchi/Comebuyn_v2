import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take'; // Use to take 1 value, dont need to unsubscribe after
import { Product } from 'shared/models/product';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';



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
    buyers: {},
    tags: {},
    price:null,
    imageUrl:null,
    title:null
  };

  croppedImage: any = '';
  tags: {};
  tagsList:[] = [];
  


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
          this.croppedImage = p.imageUrl;
          this.product = p;
          this.tags = p.tags;
        });
  }

  getTags(tags: []){
    this.tagsList = tags;
  }

  generateTagObject(product){
    let obj = {};
    let numTags = 0;
    // Generate user input tags
    for (let tag of this.tagsList){
      let tagKey:string = 'tag' + numTags;
      let tagName:string = tag['name'];
      
      obj[tagKey] = tagName;
      numTags++;
    }

    // Generate tags based on name
    for (let word of product.title.split(" ")){
      let tagKey:string = 'tag' + numTags;
      obj[tagKey] = word.toLowerCase();
      numTags++;
    }
    this.tags = obj;
  }

  getImage(image: string){
    this.croppedImage = image;
    // For display
    this.product.imageUrl = image;
  }

  // Takes json object generated by ngForm
  save(product) {
    //Generate tag object of proper form for db
    this.generateTagObject(product);
    product.tags = this.tags;
    product.imageUrl = this.croppedImage;

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
