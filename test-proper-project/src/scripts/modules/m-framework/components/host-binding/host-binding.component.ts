import {Component, OnInit, HostBinding} from "@angular/core";

@Component(
    {
        selector: "host-binding",
        template: `
            <h3>This is @HostBindling example</h3>
            <p> &laquo;hostBinding&raquo; has id hostBinding</p>
        `
    }
)

export class HostBindingComponent implements OnInit {

    @HostBinding('attr.id') id: string = 'hostBinding';

    constructor() {

    }
    
    ngOnInit() {
        
    }

}