import {Component} from "@angular/core";
import {NgForExampleService} from "../ng-for-example/ng-for-example.service";

@Component({
    selector: "ng-if-example",
    templateUrl: "ng-if-example.html",
})
export class NgIfExampleComponent {

    condition: boolean = false;
    thenCondition: boolean = true;

}