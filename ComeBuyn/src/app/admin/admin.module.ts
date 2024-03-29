import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatChipsModule,  
          MatIconModule,
          MatInputModule, } from '@angular/material';
import { ChipInputComponent } from './components/chip-input/chip-input.component';

@NgModule({
  declarations: [
    AdminProductsComponent,
    ProductFormComponent,
    AdminOrdersComponent,
    OrderFormComponent,
    ImageUploadComponent,
    ChipInputComponent
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    MatChipsModule,  
    MatIconModule,
    MatInputModule,
    ImageCropperModule,
    RouterModule.forChild([
      { path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] },
    
      { path: 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] },
      
      { path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] },

      { path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] },

      { path: 'admin/orders/:id', 
        component: OrderFormComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] },  
      
      { path: 'admin/image-upload', 
        component: ImageUploadComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] },  
    ])
  ], 
  providers: [
    AdminAuthGuard
  ]

})
export class AdminModule { }
