import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InfoComponent } from './components/info/info.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    InfoComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
