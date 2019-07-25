import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as app_reducer from '../store/app.reducers';
import * as auth_actions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router,
    private store: Store<app_reducer.AppState>) { }

  signUpUser(email: string, password: string) {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.store.dispatch(new auth_actions.SignUp());
        firebase.auth().currentUser.getIdToken().then(token => {
          this.store.dispatch(new auth_actions.SetToken(token));
        });
      })
      .catch(err => console.log(err)
      );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        this.store.dispatch(new auth_actions.SignIn());
        this.route.navigate(['./']);
        firebase.auth().currentUser.getIdToken().then(token => {
          this.store.dispatch(new auth_actions.SetToken(token));
        });
      })
      .catch(err => console.log(err));
  }

  logOut() {
    firebase.auth().signOut();
    this.store.dispatch(new auth_actions.SignOut());
  }
}
