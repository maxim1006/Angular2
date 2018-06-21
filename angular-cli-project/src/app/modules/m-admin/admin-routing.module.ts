import {RouterModule, Routes} from "@angular/router";
import {NgModule} from '@angular/core';
import {MAdminComponent} from "./m-admin.component";

const routes: Routes = [
    {
        path: 'admin',
        data: {
            title: "Admin"
        },
        component: MAdminComponent
    },
    {path: 'admin/:id', component: MAdminComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        // RouterModule.forRoot(routes, {useHash: true})
        // other imports here
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
