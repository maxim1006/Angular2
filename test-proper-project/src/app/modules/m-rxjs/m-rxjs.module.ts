import {StoreModule} from "@ngrx/store";
import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";
import {MRxjsComponent} from "./m-rxjs.component";
// import {events} from "./reducers/reducers";
import {RxjsExampleComponent} from "./components/rxjs-example/rxjs-example.component";
import {RxJsComponent} from "./components/rx-js/rx-js.component";
// import {NgrxDispatchComponent} from "./components/ngrx-dispatch/ngrx-dispatch.component";
// import {NgrxSubscribeComponent} from "./components/ngrx-subscribe/ngrx-subscribe.component";

@NgModule({
    imports: [
        SharedModule,
        // StoreModule.provideStore({ events })   //not working in aot and for now it sucks
    ],
    exports: [MRxjsComponent],
    declarations: [
        MRxjsComponent,
        RxjsExampleComponent,
        RxJsComponent
        // NgrxDispatchComponent,
        // NgrxSubscribeComponent
    ],
    providers: []
})
export class MRxjsModule {}


