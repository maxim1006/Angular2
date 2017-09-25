import {Component} from '@angular/core';

@Component({
    selector: "class-example",
    templateUrl: "./classExampleComponent.html"
})

export class ClassExampleComponent {
    public constructor() {
    }

    getClasses() {
        return {
            item: true,
            _next: true
        };
    }

    //так задаю класс
    // @HostBinding('class')
    // get styleClass() {
    //     return this._styleClass || 'hammer-example';
    // }
    //
    // set styleClass(value: string) {
    //     this._styleClass = 'hammer-example' + value;
    // }
}