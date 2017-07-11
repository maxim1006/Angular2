import {RouterModule, Routes} from "@angular/router";
import {NgModule} from '@angular/core';
import {MFrameworkComponent} from "./modules/m-framework/m-framework.component";
import {MComponentsComponent} from "./modules/m-components/m-components.component";
import {MHttpComponent} from "./modules/m-http/m-http.component";
import {MFormComponent} from "./modules/m-forms/m-form.component";
import {PageNotFoundComponent} from "./modules/shared/components/page-not-found/page-not-found.component";
import {MAdminComponent} from "./modules/m-admin/m-admin.component";
import {MAdminGuardService} from "./modules/m-admin/m-admin-guard.service";
import {MLazyComponent} from "./modules/m-lazy/m-lazy.component";
import {MHomeComponent} from "./modules/m-home/m-home.component";


const routes: Routes = [
    {path: '', redirectTo: '/component', pathMatch: 'full'},
    {path: 'component', component: MHomeComponent},
    // {path: '', redirectTo: '/framework', pathMatch: 'full'}, //redirect example
    // {path: 'framework', component: MFrameworkComponent}, //simple module loading
    {path: 'components', component: MComponentsComponent},
    {path: 'http', component: MHttpComponent},
    {path: 'forms', component: MFormComponent},
    {path: 'framework', loadChildren: './modules/m-framework/m-framework.module#MFrameworkModule'},
    {path: 'lazy', loadChildren: './modules/m-lazy/m-lazy.module#MLazyModule'},
    {
        path: 'admin',
        component: MAdminComponent,
        canActivate: [MAdminGuardService]
    },
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
        // RouterModule.forRoot(routes, {useHash: true})
        // other imports here
    ],
    exports: [
        RouterModule
    ]
})
export class NgRoutingModule { }
