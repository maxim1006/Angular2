import {NgModule} from "@angular/core";
import {SimpleLogDirective} from "./directives/simple-log/simpleLogDirective";
import {ClickOutsideDirective} from "./directives/click-outside/clickOutsideDirective";
import {CustomPipe} from "./pipes/customPipe";
import {objToArrPipe} from "./pipes/objToArrPipe";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ContentEditableDirective} from "./directives/content-editable/content-editable.directive";
import {CommonModule} from "@angular/common";
import {EllipsisDirective} from "./directives/ellipsis/ellipsis.directive";

@NgModule({
    imports: [CommonModule],
    exports: [
        CommonModule,

        /*Directive*/
        SimpleLogDirective,
        ClickOutsideDirective,
        ContentEditableDirective,
        EllipsisDirective,

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
        EllipsisDirective,

        /*Pipes*/
        CustomPipe,
        objToArrPipe
    ],
    providers: [],
})
export class SharedModule {

}