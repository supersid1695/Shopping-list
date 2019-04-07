import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Italian stack', 'All you need is a stack ;)',
      'https://media2.s-nbcnews.com/j/newscms/2018_35/1363730/rachel-hollis-chicken-fingers-today-main-180828_b9b2a726ec8654e3f9f7435ce26588fb.today-inline-large.jpg')
    , new Recipe('Payasum', 'blah, blah blah',
      'https://static1.squarespace.com/static/59b025caa9db09bd86a9160f/t/59b0354d5404e24e97b5a9af/1504720460481/pc070463.jpg?format=2500w')
  ];

  constructor() { }

  ngOnInit() {
  }

}
