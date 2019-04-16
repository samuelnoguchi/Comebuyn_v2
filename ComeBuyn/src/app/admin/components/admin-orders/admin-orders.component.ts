import { Component, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnDestroy {

  orders: any[];
  filteredOrders: any[];
  subscription: Subscription;

  constructor(private orderService: OrderService) { 
    this.subscription = this.orderService.getAll().subscribe(orders=>{
      this.filteredOrders = this.orders =  orders;
      console.log(this.filteredOrders);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}