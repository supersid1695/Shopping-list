import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class SignUp implements Action {
    readonly type = SIGNUP;
}

export class SignIn implements Action {
    readonly type = SIGNIN;
}

export class SignOut implements Action {
    readonly type = SIGNOUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: string) { }
}

export type AuthActions =
    SignUp |
    SignIn |
    SignOut |
    SetToken;
