import { Store } from '@ngrx/store';
import { HttpEvent } from '@angular/common/http';
import * as app_reducers from '../../store/app.reducers';
import * as auth_reducers from '../../auth/store/auth.reducers';
import * as auth_actions from '../../auth/store/auth.actions';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DataStorageservice } from 'src/app/shared/data-storage.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
    authState: Observable<auth_reducers.State>;

    constructor(private dataService: DataStorageservice,
        private store: Store<app_reducers.AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSaveData() {
        this.dataService.storeRecipe().subscribe(
            (response: HttpEvent<any>) => {
                console.log(response);
            }
        );
    }

    onFetchData() {
        this.dataService.getRecipe();
    }

    onLogout() {
        this.store.dispatch(new auth_actions.SignOut());
    }

}
