import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  declarations: [
    AdminProductsComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] },
    
      { path: 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] },
      
      { path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] }
    ])
  ], 
  providers: [
    AdminAuthGuard
  ]

})
export class AdminModule { }