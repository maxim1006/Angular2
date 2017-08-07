import {Component, OnInit} from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from';
import {Observer} from "rxjs";

@Component({
    selector: "rxjs-example",
    templateUrl: "./rxjsExampleComponent.html"
})

export class RxjsExampleComponent implements OnInit {
    public inputValue: string;
    public arr:string[] = ['Hi', 'rxjs', '!!!'];
    //создаю observable array
    public sequence:Observable<string> = Observable.from(this.arr);

    constructor() {
        console.log(this.sequence);
        this.sequence.subscribe((res: string) => console.log(res));
    }

    public addItemToArray(value) {
        this.arr.push(value);
        this.sequence.subscribe((res: string) => console.log(res));
    }

    ngOnInit() {
        let o:Observable<string> = Observable.create((observer:Observer<string>) => {
            observer.next("string");
            observer.next("string1");
            observer.next("string2");
        }).share();

        o.subscribe((string) => {
            console.log(string);
        });

        o.subscribe((string) => {
            console.log(string);
        });
    }

}