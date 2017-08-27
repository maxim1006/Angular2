// холодные обзервеблы, все подписавшиеся до первого next вызовутся по умолчанию, но не будут обновляться при изменении, будет обновляться только o3, а горячие вызовутся все, только подписавшиеся после 1го next и пошарят 1 данные, также горячие сабскрайберы сработают только на то что произошло после сабскрипшина, а холодные на то что произошло до сабскрипшена тоже сработают

import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";

@Component({
    selector: 'rx-js',
    template: `
        <p (click)="onClick()">Click me</p>
        {{numberObservable | async}}
    `
})
export class RxJsComponent implements OnInit {
    numberObservable: Observable<any>;
    subscription: any;
    number: number = 1;
    private subscriber: Subscriber<number>;
    constructor() {}

    ngOnInit() {

        this.numberObservable = Observable.create((subscriber: Subscriber<any>) => {
            this.subscriber = subscriber;
            this.subscriber.next(this.number);
        }).share();

        //если не будет хоть 1 сабскайбера, то this.subscriber.next(number) не сработает, | async - это тоже что и subscribe, только автоматом через view


    }

    ngAfterViewInit() {
        //положил их сюда, для того, чтобы горячий обзервебл отрендерил тот что во вью. Если бы положил в onInit, то сработал бы только o1, так как подписка произошла после того как вызвался первый next, а в этом случае горячий вызывает только первый сабскайбер
        this.numberObservable.subscribe((data) => {
            console.log(data, ' o1');
        });

        this.numberObservable.subscribe((data) => {
            console.log(data, ' o2');
        });

        this.numberObservable.subscribe((data) => {
            console.log(data, ' o3');
        });
    }

    onClick() {
        this.subscriber.next(++this.number);
    }
}