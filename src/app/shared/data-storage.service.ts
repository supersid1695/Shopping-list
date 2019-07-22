import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';
// import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageservice {
    constructor(private http: HttpClient, private recipeService: RecipeService, private auth: AuthService) { }

    storeRecipe() {
        const token = this.auth.getToken();
        // const httpRequest = new HttpRequest('PUT', 'https://ng-shopping-list-5fdbc.firebaseio.com/recipe.json',
        // this.recipeService.getRecipes(), {
        //     params: new HttpParams().set('auth', token)
        // });
        const httpRequest = new HttpRequest('PUT',
        'https://ng-shopping-list-5fdbc.firebaseio.com/recipe.json', this.recipeService.getRecipes());
        return this.http.request(httpRequest);

        // return this.http.put('https://ng-shopping-list-5fdbc.firebaseio.com/recipe.json?auth=' + token,
        //  this.recipeService.getRecipes(), {
        //     observe: 'response',
        //     headers: new HttpHeaders().set('Authorization', 'Bearer ejkjkjdkmkjdkskjsks')
        // });
    }

    getRecipe() {
        return this.http.get<Recipe[]>('https://ng-shopping-list-5fdbc.firebaseio.com/recipe.json',
            {
                observe: 'body',
                responseType: 'json',
            })
            .subscribe(response => {
                this.recipeService.setRecipes(response);
            });
    }
}
