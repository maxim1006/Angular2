import {RouterModule, Routes} from "@angular/router";
import {NgModule} from '@angular/core';
import {AdminIdComponent} from "./components/admin-id.component";

const routes: Routes = [
    {path: 'admin/:id', component: AdminIdComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
        // RouterModule.forRoot(routes, {useHash: true})
        // other imports here
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
