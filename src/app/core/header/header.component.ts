import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as app_reducers from '../../store/app.reducers';
import * as auth_actions from '../../auth/store/auth.actions';
import * as auth_reducers from '../../auth/store/auth.reducers';
import * as recipes_actions from '../../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
    authState: Observable<auth_reducers.State>;

    constructor(private store: Store<app_reducers.AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSaveData() {
        this.store.dispatch(new recipes_actions.StoreRecipes());
    }

    onFetchData() {
        this.store.dispatch(new recipes_actions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new auth_actions.SignOut());
    }
}
