import { Component, OnInit, Inject} from '@angular/core';
import {MHttpService} from "./m-http.service";
import {NewService} from "./new.service";



export class FamilyMember {
    name: string;
    age: number;
    sex: string;
}


@Component({
    selector: 'm-http',
    templateUrl: "./m-http.component.html"
})
export class MHttpComponent implements OnInit {
    private family: FamilyMember[];

    constructor(
        @Inject('KEY1') private key1: string,
        @Inject('KEY2') private key2: string,
        private _mHttpService: MHttpService,
        @Inject('Value') private _value: string,
        private _newService: NewService
    ) { }

    ngOnInit() {
        let getData = this._mHttpService.getData();

        getData.subscribe(data => {
            console.log(data);
            this.family = data;
        });

        getData.subscribe(data => {
            console.log(data);
            this.family = data;
        });

        getData.subscribe(data => {
            console.log(data);
            this.family = data;
        });
        
        console.log(this._value);

        console.log(this._newService);
    }
}



let KEY1 = 1;
let KEY2 = 2;

export const httpInjectables: any[] = [
    {provide: 'KEY1', useValue: KEY1},
    {provide: 'KEY2', useValue: KEY2}
];


