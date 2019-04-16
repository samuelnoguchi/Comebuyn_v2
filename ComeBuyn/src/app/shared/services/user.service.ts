import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { map, switchMap } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }

  update(uid, appUser:AppUser){
    return this.db.object('/users/' + uid).update(appUser);
  }
}
