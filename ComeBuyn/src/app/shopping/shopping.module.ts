import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { CompletedOrdersComponent } from './components/completed-orders/completed-orders.component';
import { ActiveCirclesComponent } from './components/active-circles/active-circles.component';

@NgModule({
  declarations: [
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ProductFilterComponent,
    ProductPageComponent,
    CheckOutComponent,
    CompletedOrdersComponent,
    ActiveCirclesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'product-page', component: ProductPageComponent },
      { path: 'product-page/:productId', component: ProductPageComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },

      { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'completed-orders', component: CompletedOrdersComponent, canActivate: [AuthGuard] },
    
      { path: 'products', component: ProductsComponent },
      { path: 'products/:category', component: ProductsComponent },


      
    ])
  ]
})
export class ShoppingModule { }
