import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as app_reducers from '../store/app.reducers';
import * as auth_reducers from '../auth/store/auth.reducers';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<app_reducers.AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth')
        .pipe(
            take(1), // emit once and unsubscribe.
            // normal map return's by wrapping a observable, switchmap returns as it is.
            switchMap((authState: auth_reducers.State) => {
                const cloningReq = req.clone({
                    params: req.params.set('auth', authState.token)
                });
                return next.handle(cloningReq);
            })
        );
    }
}
