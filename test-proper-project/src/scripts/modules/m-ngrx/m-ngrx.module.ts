import {StoreModule} from "@ngrx/store";
import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";
import {MNgrxComponent} from "./m-ngrx.component";
import {events} from "./reducers/reducers";
import {NgrxDispatchComponent} from "./components/ngrx-dispatch/ngrx-dispatch.component";
import {NgrxSubscribeComponent} from "./components/ngrx-subscribe/ngrx-subscribe.component";

@NgModule({
    imports: [
        SharedModule,
        StoreModule.provideStore({ events })
    ],
    exports: [MNgrxComponent],
    declarations: [
        MNgrxComponent,
        NgrxDispatchComponent,
        NgrxSubscribeComponent
    ],
    providers: []
})
export class MNgrxModule {}


