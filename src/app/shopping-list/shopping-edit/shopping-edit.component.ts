import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as sl_actions from '../store/shopping-list.actions';
import * as app_reducers from '../../store/app.reducers';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItem: Ingredient;

  constructor(private store: Store<app_reducers.AppState>) { }

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe(data => {
        if (data.editedItem > -1) {
          this.editItem = data.editedIngredient;
          this.editMode = true;
          this.shoppingListForm.setValue({
            'name': this.editItem.name,
            'amount': this.editItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.store.dispatch(new sl_actions.UpdateIngredient({ Ingredient: newIngredient }));
    } else {
      this.store.dispatch(new sl_actions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  resetScreen() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    this.store.dispatch(new sl_actions.DeleteIngredient());
    this.resetScreen();
  }

  ngOnDestroy() {
    this.store.dispatch(new sl_actions.StopEdit());
    this.subscription.unsubscribe();
  }
}
