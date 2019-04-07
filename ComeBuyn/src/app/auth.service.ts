import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router:Router) { 
    this.user$ = afAuth.authState;
  }

  login(){
    // If a return url is present save it in variable
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl' || '/');
    
    // login, navigating to the return url afterwards if necissary
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(finished => {
        this.router.navigate([returnUrl]);
      });


  }
  logout(){
    this.afAuth.auth.signOut();
  }


}
