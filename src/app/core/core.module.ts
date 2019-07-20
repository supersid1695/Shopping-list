import { NgModule } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { RecipeService } from '../recipes/recipes.service';
import { HeaderComponent } from './header/header.component';
import { DataStorageservice } from '../shared/data-storage.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [ShoppingListService, RecipeService, DataStorageservice, AuthService],
})
export class CoreModule { }
