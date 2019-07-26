import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from '../store/auth.actions';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { auth as firebaseAuth } from 'firebase';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {
    constructor(private actions$: Actions,
        private router: Router) { }

    // It listens to all the actions of the app
    @Effect()
    authSignUp = this.actions$.pipe(
        // check a certain action occured, in this case "TRY_SIGNUP".
        ofType(AuthActions.TRY_SIGNUP),
        // once we get the action, extract the payload
        map((action: AuthActions.TrySignup) => {
            return action.payload;
        }),
        switchMap((authData: { username: string, password: string }) => {
            // firebase return's a promise, with the help of from we can convert promise to observable so that, we can use it.
            return from(firebaseAuth().createUserWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => {
            // once user is created retrive the token.
            return from(firebaseAuth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            return [{
                type: AuthActions.SIGNUP
            }, {
                type: AuthActions.SET_TOKEN,
                payload: token
            }];
        })
    );

    @Effect()
    authSignIn = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNIN),
        map((action: AuthActions.TrySignIn) => {
            return action.payload;
        }),
        switchMap((authData: { username: string, password: string }) => {
            return from(firebaseAuth().signInWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => {
            return from(firebaseAuth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [{
                type: AuthActions.SIGNIN
            }, {
                type: AuthActions.SET_TOKEN,
                payload: token
            }];
        })
    );

    // Effect always returns a action observable, if we dont wish to return anything 
    // we can use dispatch: false, else it will create a infinite loop and hogs the browser.
    @Effect({ dispatch: false })
    authSignOut = this.actions$.pipe(
        ofType(AuthActions.SIGNOUT),
        // we can subscribe here, but the observable will be dead, ngrx needs it as observable for further opeartion
        // lets use tap, it just does takes thats it
        tap(() => {
            this.router.navigate(['/']);
        })
    );
}
