import { NgModule } from '@angular/core';
import { DropdowmDirectiveDirective } from './dropdowm.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [DropdowmDirectiveDirective],
    exports: [
        CommonModule,
        DropdowmDirectiveDirective
    ]
})
export class SharedModule { }
