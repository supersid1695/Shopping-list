import * as auth_actions from './auth.actions';

export interface State {
    token: string;
    authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
};

export function authReducer(state = initialState, action: auth_actions.AuthActions) {
    switch (action.type) {
        case (auth_actions.SIGNUP):
        case (auth_actions.SIGNIN):
            return {
                ...state,
                authenticated: true,
            };
        case (auth_actions.SIGNOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            };
        case (auth_actions.SET_TOKEN):
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}
