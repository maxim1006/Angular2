import {Component, HostBinding} from '@angular/core';

@Component({
    selector: 'app-component',
    templateUrl: './appComponent.html',
    // styleUrls: ['./app.component.css']
})
export class AppComponent {
    @HostBinding('class.app-component') addClass: boolean = true;

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
}
