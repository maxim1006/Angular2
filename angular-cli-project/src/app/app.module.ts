import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, EVENT_MANAGER_PLUGINS} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MHomeModule} from "./modules/m-home/m-home.module";
import {MAdminModule} from "./modules/m-admin/m-admin.module";
import {MRxjsModule} from "./modules/m-rxjs/m-rxjs.module";
import {MForRootModule} from "./modules/m-for-root/m-for-root.module";
import {SharedModule} from "./modules/shared/shared.module";
import {RouteService} from "./route.service";
import {MFormsModule} from "./modules/m-forms/m-forms.module";
import {MHttpModule} from "./modules/m-http/m-http.module";
import {AppRoutingModule} from "./app-routing.module";
import {PageLoaderService} from "./common/services/page-loader.service";
import {PageUtilsService} from "./common/services/page-utils.service";
import {domenToken} from "./modules/shared/tokens/tokens";
import {AppService} from "./modules/app.service";
import {HammerPluginPatch} from "./common/patches/hammer-plugin.patch";



export function routeServiceFactory (route: RouteService):()=>{} {
    return () => route.init()
}

export class MyHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
        'swipe': {velocity: 0.4, threshold: 20} // override default settings
    }
}



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, //подключает коммон модуль, директивы, пайпы
        FormsModule, //подключает ngModel модуль
        BrowserAnimationsModule, //модуль для анимаций
        HttpClientModule,
        MHomeModule,
        MFormsModule,
        MHttpModule,
        SharedModule,
        MAdminModule,
        MRxjsModule,
        MForRootModule.forRoot({data: 1}), //так могу в модуль прокинуть инфу
        AppRoutingModule //этот модуль, в котором все руты приложения должен идти в самом конце, после всех модулей с RouterModule.forChild(routes), это из-за wildCard модуля
    ],
    providers: [
        PageUtilsService,
        PageLoaderService,
        {provide: domenToken, useValue: domenToken},
        {provide: "NamedService", useClass: AppService, multi: true},
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig
        },

        /*Эта часть нужна, чтобы загрузить какие-то данные перед всей аппликухой*/
        RouteService,
        {
            provide: APP_INITIALIZER,
            useFactory: routeServiceFactory,
            deps: [RouteService],
            multi: true
        },
        ///////////////

        //hammer fix
        {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: HammerPluginPatch,
            multi: true
        },

        //{provide: APP_BASE_HREF, useValue: '/'} //можно исxjsExampleComponent.tsпользовать вместо <base href="/">
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
