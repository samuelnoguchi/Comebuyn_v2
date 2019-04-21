import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { SearchService } from 'app/core/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
{
  appUser: AppUser;
  navbarOpen = false;

  constructor(private auth: AuthService, private searchService: SearchService) { 
    auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  search(searchContent){
    this.searchService.search(searchContent.value);
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
