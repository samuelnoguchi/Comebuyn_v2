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

  // Determine if product matches search query ... todo: speed up this search, O(n^4) n=all products in db i think
  filter(products){
    let productList = [];
    let queryItems = this.query.toLowerCase().split(" ");
    for(let product of products){
      let tags = product.tags;
      // Super slow
      for (let queryItem of queryItems){
        if (tags && Object.values(tags).includes(queryItem)){
          if(!productList.includes(product)){
            productList.push(product);  
          }   
        }
      }
    }
    return productList;
  }
}
