import {BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";
import {APP_INITIALIZER, ApplicationRef, NgModule, NgZone} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
/*Components*/
import {NgRoutingModule} from "./ng-routing.module";
import {MFormsModule} from "./modules/m-forms/m-forms.module";
import {MHttpModule} from "./modules/m-http/m-http.module";
import {AppComponent} from "./app.component";
import {domenToken} from "./modules/shared/tokens/tokens";
import {SharedModule} from "./modules/shared/shared.module";
import {RouteService} from "./route.service";
import {MAdminModule} from "./modules/m-admin/m-admin.module";
import {createInputTransfer, createNewHosts, removeNgStyles} from "@angularclass/hmr";
import {MHomeModule} from "./modules/m-home/m-home.module";
import {MRxjsModule} from "./modules/m-rxjs/m-rxjs.module";
import {PageUtilsService} from "./common/services/page-utils.service";
import {PageLoaderService} from "./common/services/page-loader.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppService} from "./modules/app.service";
import {MForRootModule} from "./modules/m-for-root/m-for-root.module";
import {HttpClientModule} from "@angular/common/http";


export class MyHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
        'swipe': {velocity: 0.4, threshold: 20} // override default settings
    }
}

export function routeServiceFactory (route: RouteService):()=>{} {
    return () => route.init()
}

/*
подключать лесс через вебпак
require("style-loader!../assets/base.less");
*/

@NgModule({
    declarations: [
        /*Components*/
        AppComponent
    ],
    imports: [
        BrowserModule, //подключает коммон модуль, директивы, пайпы
        FormsModule, //подключает ngModel модуль
        BrowserAnimationsModule, //модуль для анимаций
        HttpModule,
        HttpClientModule,
        MHomeModule,
        MFormsModule,
        MHttpModule,
        SharedModule,
        MAdminModule,
        MRxjsModule,
        MForRootModule.forRoot({data: 1}), //так могу в модуль прокинуть инфу
        NgRoutingModule //этот модуль, в котором все руты приложения должен идти в самом конце, после всех модулей с RouterModule.forChild(routes), это из-за wildCard модуля
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

        //{provide: APP_BASE_HREF, useValue: '/'} //можно использовать вместо <base href="/">
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
    // ngDoBootstrap() {} //чтобы забутстрапить без app компонента
    constructor(public appRef: ApplicationRef, private zone: NgZone) {
        zone.onMicrotaskEmpty.subscribe(() => {
            console.log("zone onMicrotaskEmpty change");
        })
        //window['zoneImpl'] = _zone; //for zone().run(()=>{}) для апдейта извне.
    }
    hmrOnInit(store) {
        if (!store || !store.state) return;
        console.log('HMR store', store);
        console.log('store.state.data:', store.state.data);
        // inject AppStore here and update it
        // this.AppStore.update(store.state)
        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }
        // change detection
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }
    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // inject your AppStore and grab state then set it on store
        // var appState = this.AppStore.get()
        store.state = {data: 'yolo'};
        // store.state = Object.assign({}, appState)
        // save input values
        store.restoreInputValues  = createInputTransfer();
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
        // anything you need done the component is removed
    }
}
