import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})

export class OrderFormComponent {
  id;
  order:Order = {
    productId:null,
    product:{
      $key:null,
      category:null,
      numBuyers:null,
      numBuyersRequired:null,
      buyers: {},
      price:null,
      imageUrl:null,
      title:null
    }
  };

  buyerIds:any[]=[];

  constructor(private orderService:OrderService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.orderService.get(this.id).valueChanges().subscribe(order=>{
      this.order = order;
      this.buyerIds = Object.values(order.product.buyers);
      
    });
  }
}
