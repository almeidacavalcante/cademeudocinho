import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    var provider = new firebase.auth.GoogleAuthProvider;
    this.afAuth.auth.signInWithRedirect(provider);
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
