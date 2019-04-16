import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shopping/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';
import { InfoComponent } from './core/components/info/info.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent },
      { path: 'info', component: InfoComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
