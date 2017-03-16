import {Directive, HostListener, HostBinding, Output, EventEmitter, ElementRef} from '@angular/core';

@Directive({
    selector: '[click-outside]'
})

export class ClickOutsideDirective {

    @Output()
    public clickOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        if (!this._el.nativeElement.contains(event.target)) {  
            console.log(targetElement, ' ++++++++++');
        }
    }

    constructor(private _el: ElementRef) {}
}