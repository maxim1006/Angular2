import {Component, HostBinding} from "@angular/core";


@Component({
    selector: "app-component",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.less"]
})
export class AppComponent {

    @HostBinding("class")
    private hostClass = "app-component";

    constructor() {
    }
}
