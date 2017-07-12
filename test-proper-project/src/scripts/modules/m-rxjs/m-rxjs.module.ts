import {StoreModule} from "@ngrx/store";
import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";
import {MRxjsComponent} from "./m-rxjs.component";
import {events} from "./reducers/reducers";
import {NgrxDispatchComponent} from "./components/ngrx-dispatch/ngrx-dispatch.component";
import {NgrxSubscribeComponent} from "./components/ngrx-subscribe/ngrx-subscribe.component";

@NgModule({
    imports: [
        SharedModule,
        StoreModule.provideStore({ events })
    ],
    exports: [MRxjsComponent],
    declarations: [
        MRxjsComponent,
        NgrxDispatchComponent,
        NgrxSubscribeComponent
    ],
    providers: []
})
export class MRxjsModule {}


