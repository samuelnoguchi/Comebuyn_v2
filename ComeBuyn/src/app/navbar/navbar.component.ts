import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../modules/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
{
  appUser: AppUser;

  constructor(private auth: AuthService) { 
    auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  logout(){
    this.auth.logout();
  }

}
