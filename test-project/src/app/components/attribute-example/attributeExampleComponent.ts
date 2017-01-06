import {Component} from '@angular/core';

@Component({
    selector: "attribute-example",
    templateUrl: "./attribute-example.component.html"
})

export class AttributeExampleComponent {
    public constructor() {
    }

    getAttributes() {
        return {
            title: "button",
            disabled: true
        };
    }
}