import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  editedItemindex: number;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemindex = index;
      this.editItem = this.shoppingService.fetchOneIngredient(index);
      this.shoppingListForm.setValue({
        'name': this.editItem.name,
        'amount': this.editItem.amount
      });
    });
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemindex, newIngredient);
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  resetScreen() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editedItemindex);
    this.resetScreen();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
