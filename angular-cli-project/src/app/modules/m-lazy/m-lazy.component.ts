import {Component} from "@angular/core";
import {MLazyService} from "./m-lazy.service";

@Component({
    selector: 'm-lazy',
    templateUrl: "./m-lazy.component.html"
})
export class MLazyComponent {
    constructor(private mLazyService: MLazyService) {}
}

