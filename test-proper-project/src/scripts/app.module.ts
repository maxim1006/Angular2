import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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


@NgModule({
    declarations: [
        /*Components*/
        AppComponent,
    ],
    imports: [
        BrowserModule, //подключает коммон модуль, директивы, пайпы
        FormsModule, //подключает ngModel модуль
        HttpModule,
        NgRoutingModule,
        MFrameworkModule,
        MComponentsModule,
        MFormsModule,
        MHttpModule,
        SharedModule
    ],
    providers: [
        {provide: domenToken, useValue: domenToken}
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}
