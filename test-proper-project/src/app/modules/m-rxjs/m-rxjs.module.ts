import {StoreModule} from "@ngrx/store";
import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";
import {MRxjsComponent} from "./m-rxjs.component";
// import {events} from "./reducers/reducers";
import {RxjsExampleComponent} from "./components/rxjs-example/rxjs-example.component";
import {RxJsComponent} from "./components/rx-js/rx-js.component";
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MRxjsAsyncPipeComponent} from "./components/async-pipe/m-rxjs-async-pipe.component";
// import {NgrxDispatchComponent} from "./components/ngrx-dispatch/ngrx-dispatch.component";
// import {NgrxSubscribeComponent} from "./components/ngrx-subscribe/ngrx-subscribe.component";

const routes: Routes = [
    { path: 'rxjs', component: MRxjsComponent, children: [{
            path: "", redirectTo: "rx-js", pathMatch: "full"
        },
        {
            path: "rx-js",
            component: RxJsComponent, data: { state: 'rx-js' }
        },
        {
            path: "rx-js-async-pipe",
            component: MRxjsAsyncPipeComponent, data: { state: 'rx-js-async-pipe' }
        },
        {
            path: "rxjs-example",
            component: RxjsExampleComponent, data: { state: 'rxjs-example' }
        }]
    }
];

@NgModule({
    imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterModule.forChild(routes),
        // StoreModule.provideStore({ events })   //not working in aot and for now it sucks
    ],
    exports: [MRxjsComponent],
    declarations: [
        MRxjsComponent,
        RxjsExampleComponent,
        RxJsComponent,
        MRxjsAsyncPipeComponent
        // NgrxDispatchComponent,
        // NgrxSubscribeComponent
    ],
    providers: []
})
export class MRxjsModule {}


