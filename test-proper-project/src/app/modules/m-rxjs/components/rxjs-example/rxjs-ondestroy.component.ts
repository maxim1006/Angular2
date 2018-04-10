import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import {Subscription} from "rxjs/Subscription";
import {domenToken} from "../../../shared/tokens/tokens";
import {HttpClient} from "@angular/common/http";
import {concatMap, map, mergeAll, switchAll, concatAll, combineAll, combineLatest, takeUntil} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {forkJoin} from "rxjs/observable/forkJoin";
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'rxjs-ondestroy',
    template: `
        <h2>Rxjs OnDestroy example</h2>
    `
})

export class RxjsOnDestroyComponent implements OnInit, OnDestroy {
    private onDestroy$ = new Subject<void>();

    constructor(private _http: HttpClient) {
    }

    ngOnInit() {
        const self = this,
            observable = Observable.interval(2000);

        observable
            .pipe(
                takeUntil(this.onDestroy$)
            )
            .subscribe(
                () => console.log("onDestroy tick")
            )
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}