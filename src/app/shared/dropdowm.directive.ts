import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdowmDirective]'
})
export class DropdowmDirectiveDirective {
  @HostBinding('class.open') open = false;
  @HostListener('click') expand() {
    if (this.open) {
      this.open = false;
    } else {
      this.open = true;
    }
  }

  constructor() { }
}

