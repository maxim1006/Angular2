import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import {Observer} from "rxjs/Observer";

@Injectable()
export class MWebsocketService {

    private webSocket: any;

    constructor() {
    }

    protected webSocketConnect(url: string): Subject<MessageEvent | object> {
        if (!this.webSocket || WebSocket.OPEN !== this.webSocket.readyState) {
            this.webSocket = new WebSocket(url);
        }
        let observable: Observable<MessageEvent> = Observable.create(
            (subscriber: Subscriber<MessageEvent>) => {
                this.webSocket.onmessage = subscriber.next.bind(subscriber);
                this.webSocket.onerror = subscriber.error.bind(subscriber);
                this.webSocket.onclose = subscriber.complete.bind(subscriber);
                return this.webSocket.close.bind(this.webSocket);
            }
        );
        let observer: Observer<object> = {
            next: (data: object) => {
                if (this.webSocket.readyState === WebSocket.OPEN) {
                    this.webSocket.send(JSON.stringify(data));
                }
            },
            error(): void {
            },
            complete(): void {
            }
        };
        return Subject.create(observer, observable);
    }
}