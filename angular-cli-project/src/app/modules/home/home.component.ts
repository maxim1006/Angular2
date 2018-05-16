import {Component, HostBinding} from "@angular/core";

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})
export class HomeComponent {

    @HostBinding("class")
    private hostClass = "home-component";

}