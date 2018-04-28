// холодные обзервеблы, все подписавшиеся после первого next вызовутся по умолчанию, а горячие вызовутся все, только подписавшиеся после 1го next и пошарят 1 данные, также горячие сабскрайберы сработают только на то что произошло после сабскрипшина, а холодные на то что произошло до сабскрипшена тоже сработают. Каждый сабскайб обновляет функцию в  Observable.create(вот эта функция триггерится каждый раз))

import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observer} from "rxjs/Observer";

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
    private subject: Subject<any> = new Subject<any>();
    constructor() {}

    ngOnInit() {

        this.numberObservable = Observable.create((subscriber: Subscriber<any>) => { //эта функция будет отрабатывать каждый раз когда происходит subscription, поэтому останется только последний (в холодных обзервеблах)
            this.subscriber = subscriber;
            this.subscriber.next(this.number);

            //this.subscriber.complete(); //после этого те кто подписался не отработают

            //это для примера работы с холодным обзервеблом, через замыкание выведутся все сабскрипшены
            // setTimeout(() => {
            //     subscriber.next(this.number);
            // }, 3000);

            return () => {
                console.log("rx-js unsubscribed in cold observable");
            };

        }).share();

        //если не будет хоть 1 сабскайбера, то this.subscriber.next(number) не сработает, | async - это тоже что и subscribe, только автоматом через view


        let observableComplete$ = new Observable((observer: Observer<any>) => {
            observer.next(1);

            // observer.error("error");
            // observer.complete();

            return () => {
                console.log("observableComplete return");
            };
        })
            .catch((e) => Observable.throw("observableComplete$ error ", e))
            .finally(() => console.log("observableComplete$ finally"));

        let observableCompleteSubscription = observableComplete$.subscribe({
            next(data) {
                console.log("observableComplete data ", data);
            },
            error(e) {
                console.log("observableComplete error ", e);
            },
            complete() {
                console.log("observableComplete complete");
            }
        });

        setTimeout(() => {
            observableCompleteSubscription.unsubscribe();
        }, 2000);



        /********************Subject**********************/
        // this.subject.subscribe({
        //     next(data) {console.log("Subject data ", data);},
        //     error(e) {console.log("Subject error ", e);},
        //     complete() {console.log("Subject complete ");},
        // });

        // this.subject.next("some data");
        // this.subject.error("some error");

        // this.subject.complete();
        // this.subject.next("some data"); //не будет вызван

        // let subject = new BehaviorSubject(0); // будет вызван 1ый раз без next с инит значением 0
        //
        // subject.subscribe({
        //     next: (v) => console.log('BehaviorSubject A: ' + v)
        // });

        // subject.next(1);
        // subject.next(2);
        //
        // subject.subscribe({
        //     next: (v) => console.log('BehaviorSubject B: ' + v)
        // });
        // subject.next(3);

        /******************** /Subject **********************/
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

        setTimeout(() => {
            this.numberObservable.subscribe((data) => {
                console.log(data, ' o4');
            });
        }, 2000);
    }

    onClick() {
        //в горячих обзервеблах this.subscriber - один на все сабскрипшены, а в холодных 1 сабскайбер на 1 сабскрипшен
        this.subscriber.next(++this.number);
    }
}