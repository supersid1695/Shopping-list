import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private route: Router) { }
  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(err => console.log(err)
      );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        // console.log(user);
        this.route.navigate(['./']);
        firebase.auth().currentUser.getIdToken().then(token => {
          this.token = token;
        });
      })
      .catch(err => console.log(err));
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(token => {
      this.token = token;
    });
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logOut() {
    firebase.auth().signOut();
    this.token = null;
  }
}
