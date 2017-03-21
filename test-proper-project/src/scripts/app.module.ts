import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

/*Components*/
import {AppComponent} from './components/app/AppComponent';
import {ElementLinkComponent} from "./components/element-link_viewChild_viewChildren/ElementLinkComponent";
import {DataBindingComponent} from "./components/data-binding/DataBindingComponent";
import {InnerDataBindingComponent} from "./components/data-binding/inner/InnerDataBindingComponent";
import {ClassExampleComponent} from "./components/class-example/classExampleComponent";
import {AttributeExampleComponent} from "./components/attribute-example/attributeExampleComponent";
import {StyleExampleComponent} from "./components/style-example/styleExampleComponent";
import {EventExampleComponent} from "./components/event-example/eventExampleComponent";
import {EncapsulationExampleComponent} from "./components/encapsulation-example/encapsulationExampleComponent";
import {
    ComponentWithDirectiveComponent,
    CustomDirective
} from "./components/component-with-directive/componentWithDirectiveComponent";
import {NgforExampleComponent} from "./components/ng-for-example/ng-for-example.component";
import {NgforExampleWithObjectComponent} from "./components/ng-for-example-with-object/ng-for-example-with-object.component";
import {NgSwitchExampleComponent} from "./components/ng-switch-example/ngSwitchExampleComponent";
import {PipeExampleComponent} from "./components/pipe-example/pipeExampleComponent";
import {TranscludeExampleComponent} from "./components/transclude-example/transcludeExampleComponent";
import {ParentComponent} from "./components/parent-component/parentComponent";
import {ChildComponent} from "./components/parent-component/child-component/childComponent";
import {RxjsExampleComponent} from "./components/rxjs-example/rxjsExampleComponent";

/*Tokens*/
import {domenToken} from "./tokens/tokens";

/*Directive*/
import {SimpleLogDirective} from "./directives/simple-log/simpleLogDirective";

/*Pipes*/
import {CustomPipe} from "./pipes/customPipe";
import {InnerHtmlComponent} from "./components/inner-html/inner-html.component";
import {ElNativeElementComponent} from "./components/el-native-element/el-native-element.component";
import {HostBindingComponent} from "./components/host-binding/host-binding.component";
import {NgMainModule} from "./modules/ng-main/ng-main.module";
import {ClickOutsideDirective} from "./directives/click-outside/clickOutsideDirective";
import {MFormsModule} from "./modules/m-forms/m-forms.module";
import {objToArrPipe} from "./pipes/objToArrPipe";
import {MHttpModule} from "./modules/m-http/m-http.module";

@NgModule({
    declarations: [
        /*Components*/
        AppComponent,
        ElementLinkComponent,
        DataBindingComponent,
        InnerDataBindingComponent,
        ClassExampleComponent,
        AttributeExampleComponent,
        StyleExampleComponent,
        EventExampleComponent,
        EncapsulationExampleComponent,
        ComponentWithDirectiveComponent,
        NgforExampleComponent,
        NgforExampleWithObjectComponent,
        NgSwitchExampleComponent,
        PipeExampleComponent,
        TranscludeExampleComponent,
        ParentComponent,
        ChildComponent,
        RxjsExampleComponent,
        InnerHtmlComponent,
        ElNativeElementComponent,
        HostBindingComponent,

        /*Directive*/
        SimpleLogDirective,
        CustomDirective,
        ClickOutsideDirective,

        /*Pipes*/
        CustomPipe,
        objToArrPipe
    ],
    imports: [
        BrowserModule, //подключает коммон модуль, директивы, пайпы
        FormsModule, //подключает ngModel модуль
        HttpModule,
        NgMainModule,
        MFormsModule,
        MHttpModule
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
