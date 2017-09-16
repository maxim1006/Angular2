import {Component, OnInit, HostListener} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";

@Component({
    selector: 'm-rxjs-async-pipe',
    template: `
        <p>Mouse X position: {{_numberObservable$ | async}} px</p>
    `
})

export class MRxjsAsyncPipeComponent implements OnInit {
    @HostListener('document:mousemove', ['$event']) onDocumentMouseMove = (event: MouseEvent) => {
        this.subscriber.next(event.pageX);
    };

    private subscriber: Subscriber<number>;

    /** @Internal */
    public _numberObservable$: Observable<number>;


    constructor() {}

    ngOnInit() {
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
}