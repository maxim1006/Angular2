import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './appComponent.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
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
