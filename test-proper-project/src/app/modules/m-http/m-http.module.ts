import {NgModule, OpaqueToken, Injectable} from "@angular/core";
import {HttpModule, Http} from "@angular/http";
import {MHttpComponent, httpInjectables} from "./m-http.component";
import {MHttpService} from "./m-http.service";
import {NewService, NewService2} from "./new.service";
import {SharedModule} from "../shared/shared.module";


export function httpModuleFactory(newService2: NewService2) {
    return new NewService(newService2);
}


@NgModule({
    imports: [SharedModule, HttpModule],
    exports: [MHttpComponent],
    declarations: [MHttpComponent],
    providers: [
        httpInjectables,
        NewService2,
        {provide: "Value", useValue: "someValue"},
        {provide: MHttpService, useClass: MHttpService},
        {
            provide: NewService,
            useFactory: httpModuleFactory,
            deps: [NewService2]}
    ],
})
export class MHttpModule {}


