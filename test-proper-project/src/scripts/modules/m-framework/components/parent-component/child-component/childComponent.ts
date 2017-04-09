import {Component, Input, EventEmitter, Output} from "@angular/core";

@Component({
    selector: "child-component",
    templateUrl: "./childComponent.html"
})

export class ChildComponent {

    @Input()
    public inputValue:string;

    @Output()
    onClickOutput: EventEmitter<string> = new EventEmitter();

    public onClick():void {
        this.onClickOutput.emit(this.inputValue);
    }

    public start() {
        console.log("child component start");
    }

    public stop() {
        console.log("child component stop");
    }

}