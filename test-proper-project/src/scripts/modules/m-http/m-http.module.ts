import {NgModule, OpaqueToken, Injectable} from "@angular/core";
import {HttpModule, Http} from "@angular/http";
import {CommonModule} from "@angular/common";
import {MHttpComponent, httpInjectables} from "./m-http.component";
import {MHttpService} from "./m-http.service";
import {NewService, NewService2} from "./new.service";



@NgModule({
    imports: [CommonModule, HttpModule],
    exports: [MHttpComponent],
    declarations: [MHttpComponent],
    providers: [
        httpInjectables,
        NewService2,
        {provide: "Value", useValue: "someValue"},
        {provide: MHttpService, useClass: MHttpService},
        {
            provide: NewService,
            useFactory: (newService2: NewService2) => {
                return new NewService(newService2);
            },
            deps: [NewService2]}
    ],
})
export class MHttpModule {}

