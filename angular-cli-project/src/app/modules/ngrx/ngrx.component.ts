import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {COUNTER_DECREMENT, COUNTER_INCREMENT} from "./store/reducers/counter.reducer";
import {Observable} from "rxjs/internal/Observable";

interface AppState {
    counter: number;
}

@Component({
    selector: 'm-ngrx',
    templateUrl: 'ngrx.component.html'
})
export class MNgrxComponent implements OnInit {
    /** @internal */
    public _counter$: Observable<number>;

    /** @internal */
    public _increase(): void {
        this.store.dispatch({
            type: COUNTER_INCREMENT
        })
    };

    /** @internal */
    public _decrease(): void {
        this.store.dispatch({
            type: COUNTER_DECREMENT
        })
    };

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this._counter$ = this.store.pipe(select('counter'));
    }
}


// Redux
// state, reducer, dispatch, Store

// Store {
//     state
//
//     private reducer(state, action) {
//         switch(action) {
//             case("1"):
//                 return state.copy();
//                 break;
//         }
//     }
//
//     dispatch(action) {
//         return reducer(state, action);
//     }
// }

// middleware - позволют подписываться на асинхронные события
// в ngrx - это эффекты