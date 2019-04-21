import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
{
  appUser: AppUser;
  navbarOpen = false;

  constructor(private auth: AuthService) { 
    auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  search(searchContent){
    console.log(searchContent.value);
    searchContent.value = '';
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    console.log(this.navbarOpen)
  }

  login(){
    this.auth.login();
  }

  logout(){
    this.auth.logout();
  }

}
