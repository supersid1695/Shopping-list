import * as sl_reducer from '../shopping-list/store/shopping-list.reducers';
import * as auth_reducer from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: sl_reducer.State;
    auth: auth_reducer.State;
}

// Instead of importing our reducers in the app modules we can map it in a central location
// using __ActionReducerMap__
export const reducers: ActionReducerMap<AppState> = {
    shoppingList: sl_reducer.shoppingListReducer,
    auth: auth_reducer.authReducer
};
