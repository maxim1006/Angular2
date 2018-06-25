import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MHttpComponent} from "./modules/m-http/m-http.component";
import {MFormComponent} from "./modules/m-forms/m-form.component";
import {PageNotFoundComponent} from "./modules/shared/components/page-not-found/page-not-found.component";
import {MAdminComponent} from "./modules/m-admin/m-admin.component";
import {MAdminGuardService} from "./modules/m-admin/m-admin-guard.service";
import {MHomeComponent} from "./modules/m-home/m-home.component";
import {MRxjsComponent} from "./modules/m-rxjs/m-rxjs.component";
import {Route} from "@angular/router/src/config";
import {Observable, of} from "rxjs/index";
import {map} from "rxjs/operators";
import {PreloadingStrategy} from "@angular/router/src/router_preloader";




//Можно создать свой класс с preloadStrategy
export class MyPreloadStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // return of(null); // если не хочу прелоад

        if ( route.data && route.data["nopreload"] ) {
            return of(null);
        }

        return load();
    }
}




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
    {path: 'framework', loadChildren: './modules/m-framework/m-framework.module#MFrameworkModule', data: {
        state: 'framework'
    }},
    {path: 'lazy', loadChildren: './modules/m-lazy/m-lazy.module#MLazyModule', data: { state: 'lazy',
            nopreload: true}},
    {
        path: 'admin',
        component: MAdminComponent,
        canActivate: [MAdminGuardService]
    },
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [
        //preloadingStrategy: PreloadAllModules - начинает загрузку модулей сразу после загрузки основного
        // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        RouterModule.forRoot(routes, { preloadingStrategy: MyPreloadStrategy })
        // RouterModule.forRoot(routes, {useHash: true})
        // other imports here
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

