import * as recipe_actions from './recipe.actions';
import { Recipe } from '../recipes.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as app_reducers from '../../store/app.reducers';

export interface Features extends app_reducers.AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('Biriyani', 'LOVE...!!',
            `https://jwalanam.in/wp-content/uploads/2017/08/chicken_biriyani.jpg`, [
                new Ingredient('chicken', 170),
                new Ingredient('rice', 290)
            ]),
        new Recipe('All american cheese burger', 'blah blah burger',
            `https://static.olocdn.net/menu/applebees/ffac757fc64d1e414422bf204f1a4f87.jpg`, [
                new Ingredient('Bun', 70),
                new Ingredient('chicken', 170),
                new Ingredient('cheese', 200)
            ]),
        new Recipe('Italian salad', 'blah blah italiano',
            `https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn`,
            [
                new Ingredient('meat', 170),
                new Ingredient('veggies', 360)
            ])
    ]
};

export function recipeReducers(state = initialState, action: recipe_actions.RecipeActions) {
    switch (action.type) {
        case (recipe_actions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case (recipe_actions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case (recipe_actions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.id];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.recipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.id] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case (recipe_actions.DELETE_RECIPE):
            const alterRecipe = [...state.recipes];
            alterRecipe.splice(action.payload, 1);
            return {
                ...state,
                recipes: alterRecipe
            };
        default:
            return state;
    }
}
