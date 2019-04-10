import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { auth } from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  appUserSubscription: Subscription;

  constructor(private auth: AuthService) { 
    this.appUserSubscription = auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.appUserSubscription.unsubscribe();
  }
}
