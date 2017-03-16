import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
    selector: 'app-component',
    templateUrl: './appComponent.html',
    // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @HostBinding('class.app-component')
    addClass: boolean = true;

    public autocomplete: any;
    public currentAutocompleteItem: any;

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
        setTimeout(() => {
            this.autocomplete = [{name: 'Max'}, {name: 'Aliya'}, {name: 'Anton'}];
            console.log('autocomplete model loaded');
        }, 2000);

        // setInterval(() => {
        //     console.log(this.currentAutocompleteItem);
        // }, 1000)
    }


}
