import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

@Component({
    selector: 'ngrx-dispatch',
    templateUrl: 'ngrx-dispatch.component.html'
})

export class NgrxDispatchComponent implements OnInit {
    constructor(private _store: Store<any>) {
    }

    ngOnInit() {}

    onClick() {
        let data = "some data";
        
        this._store.dispatch({
            type: "UPDATE",
            payload: {
                data
            }
        });
    }
}