import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MFrameworkComponent} from "./m-framework.component";
import {ElementLinkComponent} from "./components/element-link_viewChild_viewChildren/elementLinkComponent";
import {DataBindingComponent} from "./components/data-binding/dataBindingComponent";
import {InnerDataBindingComponent} from "./components/data-binding/inner/innerDataBindingComponent";
import {ClassExampleComponent} from "./components/class-example/classExampleComponent";
import {AttributeExampleComponent} from "./components/attribute-example/attributeExampleComponent";
import {StyleExampleComponent} from "./components/style-example/styleExampleComponent";
import {EventExampleComponent} from "./components/event-example/eventExampleComponent";
import {EncapsulationExampleComponent} from "./components/encapsulation-example/encapsulationExampleComponent";
import {ComponentWithDirectiveComponent, CustomDirective} from "./components/component-with-directive/ComponentWithDirectiveComponent";
import {NgforExampleComponent} from "./components/ng-for-example/ng-for-example.component";
import {NgforExampleWithObjectComponent} from "./components/ng-for-example-with-object/ng-for-example-with-object.component";
import {NgSwitchExampleComponent} from "./components/ng-switch-example/ngSwitchExampleComponent";
import {PipeExampleComponent} from "./components/pipe-example/pipeExampleComponent";
import {TranscludeExampleComponent} from "./components/transclude-example/transcludeExampleComponent";
import {ParentComponent} from "./components/parent-component/parentComponent";
import {ChildComponent} from "./components/parent-component/child-component/childComponent";
import {RxjsExampleComponent} from "./components/rxjs-example/rxjsExampleComponent";
import {InnerHtmlComponent} from "./components/inner-html/inner-html.component";
import {ElNativeElementComponent} from "./components/el-native-element/el-native-element.component";
import {HostBindingComponent} from "./components/host-binding/host-binding.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [CommonModule, HttpModule, FormsModule, ReactiveFormsModule, SharedModule],
    declarations: [
        MFrameworkComponent,
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
        CustomDirective
    ],
    exports: [MFrameworkComponent],
    providers: []
})
export class MFrameworkModule {
}