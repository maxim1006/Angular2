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
import {ParentComponent} from "./components/parent-component/parentComponent";
import {ChildComponent} from "./components/parent-component/child-component/childComponent";
import {RxjsExampleComponent} from "./components/rxjs-example/rxjsExampleComponent";
import {ElNativeElementComponent} from "./components/el-native-element/el-native-element.component";
import {HostBindingComponent} from "./components/host-binding/host-binding.component";
import {SharedModule} from "../shared/shared.module";
import {DetectPropertyChangeComponent} from "./components/detect-property-change/detect-property-change.component";
import {TranscludeExampleComponent} from "./components/transclude-example/transclude-example.component";
import {InnerTranscludeExampleComponent} from "./components/transclude-example/inner-transclude-example.component";
import {CustomChangeDetectionComponent} from "./components/custom-change-detection/custom-change-detection.component";
import {CustomChangeDetectionComponentInner} from "./components/custom-change-detection/components/custom-change-detection-inner.component";
import {DynamicComponent} from "./components/dynamic/dynamic.component";
import {NgIfExampleComponent} from "./components/ng-if-example/ng-if-example.component";
import {MFrameworkRoutingModule} from "./m-framework.routing";
import {NgTemplateExampleComponent} from "./components/ng-template-example/ngTemplateExampleComponent";

@NgModule({
    imports: [SharedModule, HttpModule, FormsModule, ReactiveFormsModule, MFrameworkRoutingModule],
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
        InnerTranscludeExampleComponent,
        ParentComponent,
        ChildComponent,
        RxjsExampleComponent,
        DynamicComponent,
        ElNativeElementComponent,
        HostBindingComponent,
        CustomDirective,
        DetectPropertyChangeComponent,
        CustomChangeDetectionComponent,
        CustomChangeDetectionComponentInner,
        NgIfExampleComponent,
        NgTemplateExampleComponent
    ],
    exports: [MFrameworkComponent, ClassExampleComponent, DynamicComponent],
    providers: []
})
export class MFrameworkModule {
}