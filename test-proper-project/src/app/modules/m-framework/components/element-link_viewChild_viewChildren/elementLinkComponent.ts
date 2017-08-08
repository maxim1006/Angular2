import {Component, ViewChild, ViewChildren, ElementRef} from '@angular/core';

@Component({
    selector: "element-link",
    templateUrl: "./elementLinkComponent.html"
})

export class ElementLinkComponent {
    @ViewChild("myInput")
    input:ElementRef; //nativeElement - cвойство объекта ElementRef - который вернет декоратор

    @ViewChildren("inputItem")
    inputs;

    public inputValue: string = '';

    public constructor() {
    }

    ngOnInit() {
    }

    public onButtonClick(element, value): void {
        console.log(element);
    }

    public getInput(): ElementRef {
        console.log(this.input.nativeElement);
        return this.input;
    }

    public getInputs() {
        console.log(this.inputs._results);
        return this.inputs;
    }
}