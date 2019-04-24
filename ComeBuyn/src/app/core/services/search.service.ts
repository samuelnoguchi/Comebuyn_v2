import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private router:Router) { }

  search(searchContent:string){
    if(searchContent){
      this.router.navigate(['/search-results', searchContent]);
    }
  }
}
