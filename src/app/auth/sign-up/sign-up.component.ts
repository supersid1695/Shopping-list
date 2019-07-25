import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as auth_actions from '../../auth/store/auth.actions';
import * as app_reducers from '../../store/app.reducers';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private store: Store<app_reducers.AppState>) { }

  ngOnInit() { }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new auth_actions.TrySignup({ username: email, password: password }));
  }
}
