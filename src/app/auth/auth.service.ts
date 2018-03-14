import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  login(){
    var provider = new firebase.auth.GoogleAuthProvider;
    this.afAuth.auth.signInWithRedirect(provider);
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
