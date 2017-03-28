import {Component, OnInit, HostBinding} from "@angular/core";

@Component({
    selector: "m-framework",
    templateUrl: "./m-framework.component.html"
})

export class MFrameworkComponent implements OnInit {

    @HostBinding('class.framework-component')
    addClass: boolean = true;

    public constructor() {
        console.log("start");
    }

    public title = 'app works!';

    public onClick(e): void {
        console.log(e);
    }

    public person = {
        name: "Max"
    };

    public getValue(e): number {
        return 12;
    }

    ngOnInit() {
    }


}