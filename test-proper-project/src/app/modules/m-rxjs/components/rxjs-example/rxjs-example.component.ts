import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import {Subscription} from "rxjs/Subscription";
import {domenToken} from "../../../shared/tokens/tokens";
import {HttpClient} from "@angular/common/http";
import {concatAll, concatMap, map} from "rxjs/operators";

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

    constructor(private _http: HttpClient) {
    }

    ngOnInit() {

        let self = this;

        // this.observer = Observable.create((subscriber: Subscriber<any>) => {
        //     this.interval = window.setInterval(() => {
        //         subscriber.next(++this.number);
        //         console.log('observable number: ', this.number);
        //     }, 1000);
        // });
        //
        //
        // this.observerSubscription = this.observer.subscribe((data: number) => {
        //     this.number = data;
        // });

        //Запросы по нескольким id в порядке очереди приходят, сабскрйбится к каждому обзерваблу в отдельности, дождется выполнения первого и лишь затем второго, сработает когда все придут
        let idsObservable$ = Observable.from([0,1,2]);

        // let idsObservableInOrder$ = idsObservable$.pipe(
        //     map((id) => {
        //         return self._http.get(`${domenToken}family${id}.json`)
        //     }),
        //     concatAll()
        // );
        //тоже что и

        // let idsObservableInOrder$ = idsObservable$.pipe(
        //     concatMap((id) => {
        //         return self._http.get(`${domenToken}family${id}.json`)
        //     })
        // );
        //
        // idsObservableInOrder$.subscribe((data) => {console.log(data);});
        /*****************************************/


        //если нужно дождаться 1го и потом 2ой делай так
        let queueObservable$ = this._http.get(`${domenToken}mocks.json`).pipe(
            concatMap((urls: any) => {
                return self._http.get(`${domenToken}${urls.familyUrl}`)
            },
(first, second) => {return {first, second}})
        ).subscribe(({first, second}) => {
            console.log(first);
            console.log(second);
        });


        //switchMap - убивает предыдущий обзервбл и создает новый (как пример с автокомплитом)

        // https://www.youtube.com/watch?v=QfvwQEJVOig&feature=youtu.be&t=1h12s
    }

    ngOnDestroy() {
        this.observerSubscription.unsubscribe();
        clearInterval(this.interval);
    }
}