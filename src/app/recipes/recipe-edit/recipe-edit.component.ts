import { Recipe } from '../recipes.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as recipe_reducers from '../store/recipes.reducers';
import * as recipe_actions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute, private router: Router,
    private store: Store<recipe_reducers.Features>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // check wheather we are in new or edit mode
      this.editMode = params['id'] != null;
      this.formInit();
    });
  }

  onSumit() {
    if (!this.editMode) {
      this.store.dispatch(new recipe_actions.AddRecipe(this.recipeForm.value));
    } else {
      this.store.dispatch(new recipe_actions.UpdateRecipe({ id: this.id, recipe: this.recipeForm.value }));
    }
    this.onCancel();
  }

  private formInit() {
    let recipeName = '';
    let imagePath = '';
    let desc = '';
    const receipeIngredients = new FormArray([]);

    if (this.editMode) {
      let recipe: Recipe;
      this.store.select('recipes').subscribe((recipeState: recipe_reducers.State) => {
        recipe = recipeState.recipes[this.id];
        recipeName = recipe.name;
        imagePath = recipe.imagePath;
        desc = recipe.description;
        if (recipe['ingredient']) {
          for (const ingredient of recipe['ingredient']) {
            receipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, Validators.required)
            }));
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(desc, Validators.required),
      'ingredient': receipeIngredients
    });

  }
  addNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name': new FormControl(''),
        'amount': new FormControl('')
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredient')).controls;
  }
}
