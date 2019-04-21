import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  query:string;
  filteredProducts = [];

  constructor(private route:ActivatedRoute, private productService:ProductService) { 
    this.route.params.pipe(
      switchMap(params=>{
        this.query = params.query;
        return this.productService.getAll();
    })).subscribe(products=>{
        this.filteredProducts = this.filter(products);
    });
  }

  // Determine if product matches search query ... todo: speed up this search
  filter(products){
    let productList = [];
    for(let product of products){
      let tags = product.tags;
      // Super slow
      if (tags && Object.values(tags).includes(this.query)){
        productList.push(product);    
      }
    }
    return productList;
  }
}
