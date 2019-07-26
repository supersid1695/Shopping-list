import { take } from 'rxjs/operators';
import { Recipe } from '../recipes.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as recipe_actions from '../../recipes/store/recipe.actions';
import * as recipe_reducers from '../../recipes/store/recipes.reducers';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute, private router: Router,
    private store: Store<recipe_reducers.Features>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.store.select('recipes').subscribe((recipeState: recipe_reducers.State) => {
        this.recipe = recipeState.recipes[this.id];
      });
    });
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(take(1)) // fetch once and be done
      .subscribe((recipeState: recipe_reducers.State) => {
        this.store.dispatch(new shoppingListActions.AddIngredients(
          recipeState.recipes[this.id].ingredient));
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new recipe_actions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
