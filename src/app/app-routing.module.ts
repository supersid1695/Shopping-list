import { NgModule } from '@angular/core';
import { HomeComponent } from './core/home/home.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [{
  path: '', component: HomeComponent
}, {
  path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
