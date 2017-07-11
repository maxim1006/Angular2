import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MComponentsComponent} from "./m-components.component";

const routes: Routes = [
    {path: '', component: MComponentsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MComponentsRoutingModule {
}