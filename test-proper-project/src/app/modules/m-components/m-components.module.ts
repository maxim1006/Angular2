import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {MComponentsComponent} from "./m-components.component";
import {MAutocompleteComponent} from "./components/m-autocomplete/m-autocomplete.component";
import {ContentEditableComponent} from "./components/content-editable/content-editable.component";
import {SharedModule} from "../shared/shared.module";
import {MTreeComponent} from "./components/m-tree/m-tree.component";
import {MEllipsisComponent} from "./components/m-ellipsis/m-ellipsis.component";
import {MSelectComponent} from "./components/m-select/m-select.component";
import {MScrollComponent} from "./components/m-scroll/m-scroll.component";
import {MCheckboxComponent} from "./components/m-checkbox/m-checkbox.component";
import {MediaQueryComponent} from "./components/media-query/media-query.component";
import {HammerExampleComponent} from "./components/hammer-example/hammer-example.component";
import {MComponentsRoutingModule} from "./m-components.routing";
import {MDynamicComponent} from "./components/m-dynamic/m-dynamic.component";


let components = [
    MDynamicComponent,
    MComponentsComponent,
    MAutocompleteComponent,
    MSelectComponent,
    MTreeComponent,
    ContentEditableComponent,
    MEllipsisComponent,
    MScrollComponent,
    MCheckboxComponent,
    MediaQueryComponent,
    HammerExampleComponent
];

let directives = [
];



@NgModule({
    imports: [SharedModule, HttpModule, FormsModule, MComponentsRoutingModule],
    declarations: [
        ...components, ...directives
    ],
    exports: [MComponentsComponent],
    entryComponents: [...components],
    providers: []
})


export class MComponentsModule {
}