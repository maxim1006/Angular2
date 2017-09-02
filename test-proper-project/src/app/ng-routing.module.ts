import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MHttpComponent} from "./modules/m-http/m-http.component";
import {MFormComponent} from "./modules/m-forms/m-form.component";
import {PageNotFoundComponent} from "./modules/shared/components/page-not-found/page-not-found.component";
import {MAdminComponent} from "./modules/m-admin/m-admin.component";
import {MAdminGuardService} from "./modules/m-admin/m-admin-guard.service";
import {MHomeComponent} from "./modules/m-home/m-home.component";
import {MRxjsComponent} from "./modules/m-rxjs/m-rxjs.component";


const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: MHomeComponent, data: { state: 'home' }},
    // {path: '', redirectTo: '/framework', pathMatch: 'full'}, //redirect example
    // {path: 'framework', component: MFrameworkComponent}, //simple module loading
    // {path: 'components', component: MComponentsComponent},
    {path: 'components', loadChildren: './modules/m-components/m-components.module#MComponentsModule', data: { state: 'components' }},
    {path: 'http', component: MHttpComponent, data: { state: 'http' }},
    {path: 'forms', component: MFormComponent, data: { state: 'forms' }},
    {path: 'rxjs', component: MRxjsComponent, data: { state: 'rxjs' }},
    {path: 'framework', loadChildren: './modules/m-framework/m-framework.module#MFrameworkModule', data: { state: 'framework' }},
    {path: 'lazy', loadChildren: './modules/m-lazy/m-lazy.module#MLazyModule', data: { state: 'lazy' }},
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
