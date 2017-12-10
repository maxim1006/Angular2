import {Component, OnInit, Input} from '@angular/core';
import {decorator, decorator1, logProperty, logProperty1} from "./decorators";

@Component({
    selector: 'm-decorators',
    templateUrl: 'm-decorators.component.html'
})

export class MDecoratorsComponent implements OnInit {
    @logProperty1()
    @logProperty
    @Input()
    a: number;

    constructor() {}

    // @decorator()
    // @decorator1
    // private method() {
    //     console.log(this.a, ` method is triggered`);
    // }

    ngOnInit() {
        // this.method();
        this.a = 2;

    }
}