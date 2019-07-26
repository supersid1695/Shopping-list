import { Effect, Actions, ofType } from '@ngrx/effects';
import * as recipe_actions from '../store/recipe.actions';
import * as recipe_reducers from '../store/recipes.reducers';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipes.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


@Injectable()
export class RecipeEffect {
    constructor(private actions$: Actions, private http: HttpClient,
        private store: Store<recipe_reducers.Features>
    ) { }

    @Effect()
    recipeFetch = this.actions$.pipe(
        ofType(recipe_actions.FETCH_RECIPES),
        switchMap((action: recipe_actions.FetchRecipes) => {
            return this.http.get<Recipe[]>('https://ng-shopping-list-5fdbc.firebaseio.com/recipe.json',
                {
                    observe: 'body',
                    responseType: 'json',
                });
        }),
        map((recipes: Recipe[]) => {
            for (const recipe of recipes) {
                if (!recipe['ingredient']) {
                    recipe['ingredient'] = [];
                }
            }
            return {
                type: recipe_actions.SET_RECIPES,
                payload: recipes
            };
        })
    );

    @Effect({ dispatch: false })
    recipeStore = this.actions$.pipe(
        ofType(recipe_actions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')), // use to combine observables
        switchMap(([action, state]) => {
            const httpRequest = new HttpRequest<Recipe[]>('PUT',
                'https://ng-shopping-list-5fdbc.firebaseio.com/recipe.json', state.recipes);
            return this.http.request(httpRequest);
        })
    );
}
