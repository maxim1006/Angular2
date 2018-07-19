import {NgModule} from '@angular/core';

import {MNgrxComponent} from './ngrx.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";




const routes: Routes = [
    {path: '', component: MNgrxComponent},
];




@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [],
    declarations: [MNgrxComponent],
    providers: [],
})
export class MNgrxModule {
}
