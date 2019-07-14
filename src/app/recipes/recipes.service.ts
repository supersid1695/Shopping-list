import { Recipe } from './recipes.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanges = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
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
            `https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn`, [
                new Ingredient('meat', 170),
                new Ingredient('veggies', 360)
            ])
    ];

    constructor(private shoppingService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addRecipes(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanges.next(this.recipes);
    }

    editRecipes(id: number, recipe: Recipe) {
        this.recipes[id] = recipe;
        this.recipesChanges.next(this.recipes);
    }

    addIngredientToShoppingList(ingredients: Ingredient[]) {
        this.shoppingService.addIngredientsFromRecipe(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipesChanges.next(this.recipes.slice());
    }
}
