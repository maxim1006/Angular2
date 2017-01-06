import {Component, ViewChild, ViewChildren, ElementRef} from '@angular/core';

@Component({
    selector: "element-link",
    templateUrl: "./element-link.component.html"
})

export class ElementLinkComponent {
    public constructor() {
    }

    public onButtonClick(element, value): void {
        console.log(element);
    }

    @ViewChild("myInput")
    input:ElementRef; //nativeElement - cвойство объекта ElementRef - который вернет декоратор

    @ViewChildren("inputItem")
    inputs;

    public getInput(): ElementRef {
        console.log(this.input.nativeElement);
        return this.input;
    }

    public getInputs() {
        console.log(this.inputs._results);
        return this.inputs;
    }
}