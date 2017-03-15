//import { Component, OnInit } from "@angular/core";
import { Component, OnInit, Inject } from "@angular/core"; //это расширенная запись
import {NgForExampleService} from "./ng-for-example.service"

@Component({
    selector: "ng-for-example",
    templateUrl: "./ng-for-example.html",
    providers: [NgForExampleService]
    //providers: [{provide: 'family', useClass: NgForExampleService}, {provide: 'url', useValue: 'http://example.com'}] //это расширенная запись обычного провайда и токена, могу делать сколько угодно значений. Также для этих целей используется opaqueToken. Т.е. можно использовать useClass, useValue, useFactory
})

export class NgforExampleComponent {
    public family;

    constructor(private ngForExampleService:NgForExampleService) {}
    //  constructor(
    //      @Inject('family') private ngForExampleService,
    //      @Inject('url') private url,
    //      @Inject('tokens') private tokens
    //  ) {} //это расширенная запись

    ngOnInit(): void {
        console.dir(this.ngForExampleService.getFamily());
        this.ngForExampleService.getFamily().subscribe(family => {
            // console.log(family);
            this.family = family
        });

        //console.log(this.tokens.domenToken);
    }

}