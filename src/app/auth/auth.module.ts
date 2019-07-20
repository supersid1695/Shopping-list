import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutes } from './authRoutes.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SignUpComponent,
        SignInComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutes
    ],
    exports: []
})
export class AuthModule { }
