import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[m-dynamic]',
})
export class MDynamicDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
