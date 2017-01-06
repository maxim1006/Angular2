import {Component} from '@angular/core';

@Component({
    selector: "style-example",
    templateUrl: "./style-example.component.html"
})

export class StyleExampleComponent {
    public constructor() {
    }

    getStyles() {
        return {
            width: "10%",
            color: "red",
            fontSize: "20px",
            transform: "translate(10px, 0)"
        };
    }
}