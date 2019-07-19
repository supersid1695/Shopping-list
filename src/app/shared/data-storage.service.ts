import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
// import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageservice {
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipe() {
        return this.http.put('https://ng-shopping-list-5fdbc.firebaseio.com/recipe.json', this.recipeService.getRecipes());
    }

    getRecipe() {
        return this.http.get<Recipe[]>('https://ng-shopping-list-5fdbc.firebaseio.com/recipe.json')
        .subscribe(response => {
            this.recipeService.setRecipes(response);
        });
        // .pipe(
        //     map((x) => x.json())
        // );
    }
}
