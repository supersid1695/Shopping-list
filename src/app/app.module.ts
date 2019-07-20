import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AuthService } from './auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { RecipeService } from './recipes/recipes.service';
import { DataStorageservice } from './shared/data-storage.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule
  ],
  providers: [ShoppingListService, RecipeService, DataStorageservice, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
