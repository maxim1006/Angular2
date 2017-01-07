import {Component} from '@angular/core';

@Component({
    selector: "event-example",
    templateUrl: "./eventExampleComponent.html"
})

export class EventExampleComponent {
    public constructor() {
    }

    public onButtonClick(element, value, event):void {
        console.log(arguments);
        console.log(this.onButtonClick.name);
    }

    public onInput(value) {
        console.log(value);
    }
}