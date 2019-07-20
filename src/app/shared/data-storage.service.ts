import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';
// import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageservice {
    constructor(private http: HttpClient, private recipeService: RecipeService, private auth: AuthService) { }

    storeRecipe() {
        const token = this.auth.getToken();
        return this.http.put('https://ng-shopping-list-5fdbc.firebaseio.com/recipe.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipe() {
        const token = this.auth.getToken();
        return this.http.get<Recipe[]>('https://ng-shopping-list-5fdbc.firebaseio.com/recipe.json?auth=' + token)
            .subscribe(response => {
                this.recipeService.setRecipes(response);
            });
        // .pipe(
        //     map((x) => x.json())
        // );
    }
}
