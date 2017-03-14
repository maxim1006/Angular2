import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

/*Components*/
import {AppComponent} from './components/app/AppComponent';
import {ElementLinkComponent} from "./components/element-link/ElementLinkComponent";
import {DataBindingComponent} from "./components/data-binding/DataBindingComponent";
import {InnerDataBindingComponent} from "./components/data-binding/inner/InnerDataBindingComponent";
import {ClassExampleComponent} from "./components/class-example/classExampleComponent";
import {AttributeExampleComponent} from "./components/attribute-example/attributeExampleComponent";
import {StyleExampleComponent} from "./components/style-example/styleExampleComponent";
import {EventExampleComponent} from "./components/event-example/eventExampleComponent";
import {EncapsulationExampleComponent} from "./components/encapsulation-example/encapsulationExampleComponent";
import {ComponentWithDirectiveComponent} from "./components/component-with-directive/componentWithDirectiveComponent";
import {NgforExampleComponent} from "./components/ng-for-example-with-service/ng-for-example.component";
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
        NgSwitchExampleComponent,
        PipeExampleComponent,
        TranscludeExampleComponent,
        ParentComponent,
        ChildComponent,
        RxjsExampleComponent,
        InnerHtmlComponent,
        ElNativeElementComponent,

        /*Directive*/
        SimpleLogDirective,

        /*Pipes*/
        CustomPipe
    ],
    imports: [
        BrowserModule, //подключает коммон модуль, директивы, пайпы
        FormsModule, //подключает ngModel модуль
        HttpModule
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
