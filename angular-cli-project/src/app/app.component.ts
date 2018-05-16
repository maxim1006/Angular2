import {Component, HostBinding} from '@angular/core';


@Component({
    selector: 'app-component',
    templateUrl: './app.component.html'
})
export class AppComponent {

    @HostBinding("class")
    private hostClass = "app-component";

    constructor() {
    }
}
