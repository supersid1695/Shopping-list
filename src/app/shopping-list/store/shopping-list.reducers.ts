import * as sl_actions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedItem: number;
}

// Since state is initialy empty will assign it with a value.
const initiale_state: State = {
    ingredients: [
        new Ingredient('black pepper', 100),
        new Ingredient('Tomato', 140),
        new Ingredient('onion', 120)
    ],
    editedIngredient: null,
    editedItem: -1
};

// use function keyword and not the Arrow function, ngRx doesn't understand it.
// The first parameter is State, initialy it is empty.
// the Second parameter is __Action__ from `@ngrx/store`
export function shoppingListReducer(state = initiale_state, action: sl_actions.ShoppingListActions) {
    // multiple actions are dispatched, typically will act upon which action was dispatched
    switch (action.type) {
        case sl_actions.ADD_INGREDIENT:
            // will return a new object, since the old one is immutable
            return {
                ...state, // old object parameters
                ingredients: [
                    ...state.ingredients, // new ingredients
                    action.payload // actions are always payload, we need to define our own actions to get the result.
                ]
            };
        case sl_actions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    ...action.payload // since it is a array
                ]
            };
        case sl_actions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedItem];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.Ingredient
            };
            const ingredients = [...state.ingredients];
            ingredients[state.editedItem] = updatedIngredient;
            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedItem: -1
            };
        case sl_actions.DELETE_INGREDIENT:
            const initIngredients = [...state.ingredients];
            initIngredients.splice(state.editedItem, 1);
            return {
                ...state,
                ingredients: initIngredients,
                editedIngredient: null,
                editedItem: -1
            };
        case sl_actions.START_EDIT:
            const editedIngredient = {
                ...state.ingredients[action.payload]
            };
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedItem: action.payload
            };
        case sl_actions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedItem: -1
            };
        default: return state;
    }
}
