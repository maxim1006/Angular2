import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MFrameworkComponent} from "./m-framework.component";

const routes: Routes = [
    {path: '', component: MFrameworkComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MFrameworkRoutingModule {
}