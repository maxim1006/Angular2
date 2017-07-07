import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
    selector: 'm-components',
    templateUrl: './m-components.component.html',
})
export class MComponentsComponent implements OnInit {

    @HostBinding('style.margin')  margin = '20px';
    @HostBinding('style.display')  display = 'block';

    public autocomplete: any;
    public currentAutocompleteItem: any;

    public _checked:boolean = true;

    ngOnInit() {

        setTimeout(() => {
            this.autocomplete = [{name: 'Max'}, {name: 'Aliya'}, {name: 'Anton'}];
            console.log('autocomplete model loaded');
        }, 2000);

        // setInterval(() => {
        //     console.log(this.currentAutocompleteItem);
        // }, 1000)

    }

    treeClick(e: any) {
        console.log('tree click ', e);
    }


}
