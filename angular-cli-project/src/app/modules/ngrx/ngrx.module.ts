import {NgModule} from '@angular/core';

import {MNgrxComponent} from './ngrx.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {counterReducer} from "./store/reducers/counter.reducer";




const routes: Routes = [
    {path: '', component: MNgrxComponent},
];




@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forRoot(
    {counter: counterReducer},
            // могу задать initial state
            // {initialState: {
            //     counter: 0
            // }}
        )
    ],
    exports: [],
    declarations: [MNgrxComponent],
    providers: [],
})
export class MNgrxModule {
}
