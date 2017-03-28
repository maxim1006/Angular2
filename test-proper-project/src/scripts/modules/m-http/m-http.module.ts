import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {MHttpComponent, httpInjectables} from "./m-http.component";


@NgModule({
    imports: [CommonModule, HttpModule],
    exports: [MHttpComponent],
    declarations: [MHttpComponent],
    providers: [httpInjectables],
})
export class MHttpModule {

}