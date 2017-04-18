import {NgModule} from "@angular/core";
import {SimpleLogDirective} from "./directives/simple-log/simpleLogDirective";
import {ClickOutsideDirective} from "./directives/click-outside/clickOutsideDirective";
import {CustomPipe} from "./pipes/customPipe";
import {objToArrPipe} from "./pipes/objToArrPipe";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ContentEditableDirective} from "./directives/content-editable/content-editable.directive";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    exports: [
        CommonModule,

        /*Directive*/
        SimpleLogDirective,
        ClickOutsideDirective,
        ContentEditableDirective,

        /*Pipes*/
        CustomPipe,
        objToArrPipe
    ],
    declarations: [
        /*Components*/
        PageNotFoundComponent,

        /*Directive*/
        SimpleLogDirective,
        ClickOutsideDirective,
        ContentEditableDirective,

        /*Pipes*/
        CustomPipe,
        objToArrPipe
    ],
    providers: [],
})
export class SharedModule {

}