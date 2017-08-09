import {Component, OnInit} from '@angular/core';
import {decorator, decorator1} from "./decorators";

@Component({
    selector: 'm-decorators',
    templateUrl: 'm-decorators.component.html'
})

export class MDecoratorsComponent implements OnInit {
    a: number;

    constructor() {}

    @decorator()
    @decorator1
    ngOnInit() {
        console.log(this, ' decorator this');
    }
}