//commented for aot otherwise error

// import {Component, OnDestroy, OnInit} from '@angular/core';
// import {Store} from "@ngrx/store";
// import {Subscription} from "rxjs/Subscription";
//
// @Component({
//     selector: 'ngrx-subscribe',
//     templateUrl: 'ngrx-subscribe.component.html'
// })
//
// export class NgrxSubscribeComponent implements OnInit, OnDestroy {
//     data: string = '';
//     subscription: Subscription;
//     subscription1: Subscription;
//     subscription2: Subscription;
//
//     constructor(private _store: Store<any>) {
//     }
//
//     ngOnInit() {
//         this.subscription = this._store.select("events").subscribe((data: any) => {
//             this.data += data.data ? data.data + ' ' : '';
//             console.log(data, ' subscription');
//         });
//         this.subscription1 = this._store.select("events").subscribe((data: any) => {
//             this.data += data.data ? data.data + ' ' : '';
//             console.log(data, ' subscription1');
//         });
//     }
//
//     ngOnDestroy() {
//         if (this.subscription) this.subscription.unsubscribe();
//         if (this.subscription1) this.subscription1.unsubscribe();
//     }
// }