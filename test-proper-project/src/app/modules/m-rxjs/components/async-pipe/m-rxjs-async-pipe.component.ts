import {Component, OnInit, HostListener} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'm-rxjs-async-pipe',
    template: `
        <p>Mouse X position: {{_numberObservable$ | async}} px</p>
        <p>Document click X position: {{_clickPosition}} px</p>
    `
})

export class MRxjsAsyncPipeComponent implements OnInit {
    clickSubscription: Subscription;
    @HostListener('document:mousemove', ['$event']) onDocumentMouseMove = (event: MouseEvent) => {
        this.subscriber.next(event.pageX);
    };

    private subscriber: Subscriber<number>;

    /** @Internal */
    public _numberObservable$: Observable<number>;

    /** @Internal */
    public _clickObservable$: Observable<any>;

    /** @Internal */
    public _clickPosition: number;

    constructor() {}

    ngOnInit() {
        this._clickObservable$ = Observable.fromEvent(document, 'click');
        this.clickSubscription = this._clickObservable$.subscribe((val) => {
            this._clickPosition = val.pageX;
            console.log('click', val.pageX);
        });

        this._numberObservable$ = Observable.create((subscriber: Subscriber<any>) => {
            this.subscriber = subscriber;
        }).throttleTime(200).share();
    }

    ngAfterViewInit() {
        //если этот обзервбл будет холодный, то он перебьет | async, поэтому поставил share()
        this._numberObservable$.subscribe((data: number) => {
            console.log('document:mousemove ', data);
        });
    }

    ngOnDestroy() {
        this.clickSubscription.unsubscribe();
    }
}