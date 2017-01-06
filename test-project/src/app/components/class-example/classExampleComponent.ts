import {Component} from '@angular/core';

@Component({
    selector: "class-example",
    templateUrl: "./class-example.component.html"
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
}