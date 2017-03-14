import {Component, OnInit} from "@angular/core";

@Component({
    selector: "root-component",
    templateUrl: "./root.component.html"
})

export class RootComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        console.log(13);
    }

}