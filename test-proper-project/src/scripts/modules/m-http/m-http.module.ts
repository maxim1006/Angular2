import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {MHttp, httpInjectables} from "./components/m-http.component.ts/m-http.component";


@NgModule({
    imports: [BrowserModule, HttpModule],
    exports: [MHttp],
    declarations: [MHttp],
    providers: [httpInjectables],
})
export class MHttpModule {

}