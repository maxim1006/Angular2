import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

/*Components*/
import {NgRoutingModule} from "./ng-routing.module";
import {MFormsModule} from "./modules/m-forms/m-forms.module";
import {MHttpModule} from "./modules/m-http/m-http.module";
import {MComponentsModule} from "./modules/m-components/m-components.module";
import {MFrameworkModule} from "./modules/m-framework/m-framework.module";
import {AppComponent} from "./app.component";
import {domenToken} from "./modules/shared/tokens/tokens";
import {SharedModule} from "./modules/shared/shared.module";
import {RouteService} from "./route.service";
import {MAdminModule} from "./modules/m-admin/m-admin.module";
import {APP_BASE_HREF} from "@angular/common";


@NgModule({
    declarations: [
        /*Components*/
        AppComponent,
    ],
    imports: [
        BrowserModule, //подключает коммон модуль, директивы, пайпы
        FormsModule, //подключает ngModel модуль
        HttpModule,
        MFrameworkModule,
        MComponentsModule,
        MFormsModule,
        MHttpModule,
        SharedModule,
        MAdminModule,
        NgRoutingModule //этот модуль, в котором все руты приложения должен идти в самом конце, после всех модулей с RouterModule.forChild(routes), это из-за wildCard модуля
    ],
    providers: [
        {provide: domenToken, useValue: domenToken},

        /*Эта часть нужна, чтобы загрузить какие-то данные перед всей аппликухой*/
        RouteService,
        {
            provide: APP_INITIALIZER,
            useFactory: (route: RouteService) => { return () => route.init() },
            deps: [RouteService],
            multi: true
        },
        ///////////////

        //{provide: APP_BASE_HREF, useValue: '/'} //можно использовать вместо <base href="/">
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}
