import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipes.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      //check wheather we are in new or edit mode
      this.editMode = params['id'] != null;
      this.formInit();
    });
  }

  onSumit() {
    if (!this.editMode) {
      this.recipeService.addRecipes(this.recipeForm.value);
    } else {
      this.recipeService.editRecipes(this.id, this.recipeForm.value);
    }
    this.onCancel();
  }

  private formInit() {
    let recipeName = '';
    let imagePath = '';
    let desc = '';
    let receipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      desc = recipe.description;
      if (recipe['ingredient']) {
        for (let ingredient of recipe['ingredient']) {
          receipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, Validators.required)
          }));
        }
      }
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
