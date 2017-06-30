import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MLazyComponent} from "./m-lazy.component";

const routes: Routes = [
    {path: '', component: MLazyComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MLazyRoutingModule {
}