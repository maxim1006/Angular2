import { Component, OnInit, Inject} from '@angular/core';

@Component({
    selector: 'm-http',
    template: `
        <h3>M-http component</h3>
        injected key1: {{key1}} <br />
        injected key2: {{key2}}
    `
})
export class MHttpComponent implements OnInit {
    constructor(@Inject('KEY1') private key1: string, @Inject('KEY2') private key2: string) { }

    ngOnInit() {

    }
}



let KEY1 = 1;
let KEY2 = 2;

export const httpInjectables: any[] = [
    {provide: 'KEY1', useValue: KEY1},
    {provide: 'KEY2', useValue: KEY2}
];


