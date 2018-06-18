import {Directive, ElementRef, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({selector: '[customStructuralDirective]'})
export class CustomStructuralDirective {

    constructor(
        private view: ViewContainerRef, //ссылка на вью
        private template: TemplateRef<ElementRef>
    ) {}

    public ngOnInit() {
        setTimeout(() => {
            this.view.createEmbeddedView(this.template);
        }, 2000)
    }
}

//
/*
*
*   <div *ngIf="value"><div>
*
*   тоже что и
*
*   <ng-template [ngIf]="value">
*       <div></div>
*   </ng-template>
* */
