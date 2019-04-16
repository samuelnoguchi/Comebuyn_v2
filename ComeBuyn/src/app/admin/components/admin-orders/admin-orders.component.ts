import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  constructor(private productService: ProductService) { 


  }



}
