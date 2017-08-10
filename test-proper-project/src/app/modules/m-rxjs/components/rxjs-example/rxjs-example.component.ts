import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'rxjs-example',
    template: `
        <h2>Rxjs Example</h2>
        {{number}}
    `
})

export class RxjsExampleComponent implements OnInit, OnDestroy {
    interval: number;
    observerSubscription: Subscription;
    number:number = 1;
    private observer: Observable<any>;

    constructor() {
    }

    ngOnInit() {

        this.observer = Observable.create((subscriber: Subscriber<any>) => {
            this.interval = window.setInterval(() => {
                subscriber.next(++this.number);
                console.log('observable number: ', this.number);
            }, 1000);
        });


        this.observerSubscription = this.observer.subscribe((data: number) => {
            this.number = data;
        });
    }

    ngOnDestroy() {
        this.observerSubscription.unsubscribe();
        clearInterval(this.interval);
    }
}