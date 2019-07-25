import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as auth_actions from '../../auth/store/auth.actions';
import * as app_reducer from '../../store/app.reducers';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private store: Store<app_reducer.AppState>  ) { }

  ngOnInit() {  }


  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new auth_actions.TrySignIn({ username: email, password: password }));
  }
}
