import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from';

@Component({
    selector: "rxjs-example",
    templateUrl: "./rxjsExampleComponent.html"
})

export class RxjsExampleComponent {
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

}