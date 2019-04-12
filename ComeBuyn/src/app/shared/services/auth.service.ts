import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';
import { switchMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute, 
    private router:Router,
    private userService: UserService) { 
    this.user$ = afAuth.authState;
  }

  login(){
    // If a return url is present save it in variable
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    
    // login, navigating to the return url afterwards if necissary
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(finished => {
        this.user$.subscribe(user=>{
          if(user){
            this.userService.save(user);
            this.router.navigateByUrl(returnUrl);
          }
        });
      });
  }
  
  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => {
        if(user) return this.userService.get(user.uid).valueChanges(); // If firebase user is logged in get db info
        return Observable.of(null); // otherwise return observable with value null
      })
    )
  }

  // Get the user uid
  getUserKey(){
    return this.user$.pipe(
      map(user => {
        return user.uid
      })
    );
  }
}
