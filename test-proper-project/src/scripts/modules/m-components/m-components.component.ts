import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
    selector: 'm-components',
    templateUrl: './m-components.component.html',
})
export class MComponentsComponent implements OnInit {

    public autocomplete: any;
    public currentAutocompleteItem: any;

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
